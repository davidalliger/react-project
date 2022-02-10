const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Haunt, Image, User } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const haunts = await Haunt.findAll({
        include: [
            {
                model: Image
            },
            {
                model: User,
                include: [Image]
            }
        ]
    });
    return res.json(haunts);
}));

const convertLatLong = (req, res, next) => {
    const lat = req.body.latitude;
    const long = req.body.longitude;
    req.body.latlong = lat + ', ' + long;
    const latlong = req.body.latlong;
    console.log(latlong)
    next();
}

const convertCountry = (req, res, next) => {
    const country = req.body.country;
    const other = req.body.other;
    if (country === 'Other') {
        req.body.country = other;
    }
    next();
}

const validateHaunt = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please give your haunt a name.')
        .if(check('name').exists({checkFalsy: true}))
        .isLength({ max: 100 })
        .withMessage('Name must be 100 characters or less.'),
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Please enter the address.')
        .if(check('address').exists({checkFalsy: true}))
        .isLength({ max: 100 })
        .withMessage('Address must be 100 characters or less.'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('Please enter the city.')
        .if(check('city').exists({checkFalsy: true}))
        .isLength({ max: 100 })
        .withMessage('City must be 100 characters or less.'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Please select the country.'),
    check('state')
        .if(check('country').exists({ checkFalsy: true }))
        .if(check('country').matches('United States'))
        .exists({ checkFalsy: true })
        .withMessage('Please select the state'),
    check('other')
        .if(check('country').exists({ checkFalsy: true }))
        .if(check('country').matches('Other'))
        .exists({ checkFalsy: true })
        .withMessage('Please enter the country.')
        .if(check('other').exists({checkFalsy: true}))
        .isLength({ max: 100 })
        .withMessage('Country must be 100 characters or less.'),
    check('latitude')
        .exists({ checkFalsy: true })
        .withMessage('Please enter the latitude.'),
    check('longitude')
        .exists({ checkFalsy: true })
        .withMessage('Please enter the longitude.'),
    check('latlong')
        .if(check('latitude').exists({ checkFalsy: true }))
        .if(check('longitude').exists({ checkFalsy: true }))
        .isLatLong()
        .withMessage('Please provide valid latitude and longitude.'),
    check('rate')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a nightly rate')
        .if(check('rate').exists({ checkFalsy: true }))
        .isDecimal({force_decimal: true, decimal_digits: '2'})
        .withMessage('Please round rate to the nearest cent.')
        .isLength({ max: 10 })
        .withMessage('Rate must be less than $9,999,999,999.00!')
        .not()
        .matches('0.00')
        .withMessage('Rate must be greater than $0.00!'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a description.'),
    handleValidationErrors
];

router.post('/', convertLatLong, validateHaunt, convertCountry, asyncHandler(async (req, res) => {
    const {
        userId,
        name,
        address,
        city,
        state,
        country,
        latitude,
        longitude,
        rate,
        description
    } = req.body;
    const newHaunt = await Haunt.create({
        userId,
        name,
        address,
        city,
        state,
        country,
        latitude,
        longitude,
        rate,
        description
    });
    console.log('Haunt is ', newHaunt);
    const haunt = await Haunt.findOne({
        where: {
            id: newHaunt.id
        },
        include: [
            {
                model: Image
            },
            {
                model: User,
                include: [Image]
            }
        ]
    });

    console.log('newHaunt is ', haunt);

    return res.json({
        haunt
    });
}));

router.put('/:id', convertLatLong, validateHaunt, convertCountry, asyncHandler(async (req, res) => {
    const { id } = req.params;
    const hauntInfo = req.body;
    delete hauntInfo.id;
    await Haunt.update(
        hauntInfo,
        {
            where: {
                id
        }
    });
    const haunt = await Haunt.findOne({
        where: {
            id
        },
        include: [
            {
                model: Image
            },
            {
                model: User,
                include: [Image]
            }
        ]
    });

    return res.json({
        haunt
    });
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Haunt.destroy({
        where: { id }
    });

    return res.json({ id });
}));

module.exports = router;
