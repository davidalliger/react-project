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

const roundRate = (req, res, next) => {
    const rate = req.body.rate;
    req.body.rate = Number(rate).toFixed(2).toString();
    next();
}

const handleStateAndCountry = (req, res, next) => {
    const country = req.body.country;
    const other = req.body.other;
    const state = req.body.state;
    if (country === 'Other') {
        req.body.country = other;
    }
    if (country !== 'United States') {
        req.body.state = null;
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
        .isLength({ max: 12 })
        .withMessage('Rate must be less than $9,999,999,999.00!')
        .custom(value => Number(value) > 0)
        .withMessage('Rate must be greater than $0.00!'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a description.'),
    check('imageUrl')
        .if(check('imageUrl').exists({ checkFalsy: true }))
        .isURL()
        .withMessage('Image URL must be a valid URL.'),
    handleValidationErrors
];

router.post('/', convertLatLong, roundRate, validateHaunt, handleStateAndCountry, asyncHandler(async (req, res) => {
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
        description,
        imageUrl
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

    if (imageUrl) {
        await Image.create({
            url: imageUrl,
            hauntId: newHaunt.id
        });
    }

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

    return res.json({
        haunt
    });
}));

router.put('/:id', convertLatLong, roundRate, validateHaunt, handleStateAndCountry, asyncHandler(async (req, res) => {
    const { id } = req.params;
    const hauntInfo = req.body;
    const { imageUrl } = hauntInfo;
    delete hauntInfo.id;
    delete hauntInfo.imageUrl;
    await Haunt.update(
        hauntInfo,
        {
            where: {
                id
        }
    });


    let haunt = await Haunt.findOne({
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

    if (imageUrl) {

        let hauntImageUrls = [];

        if(haunt.Images.length) {
            hauntImageUrls = haunt.Images.map(image => image.url);
        }

        if(!hauntImageUrls.includes(imageUrl)) {
            await Image.create({
                url: imageUrl,
                hauntId: id
            });

        }

    } else {
        if (haunt.Images.length) {
            await Image.destroy({
                where: { hauntId: id }
            });
        }
    }
        haunt = await Haunt.findOne({
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

    await Image.destroy({
        where: { hauntId: id }
    });

    return res.json({ id });
}));

module.exports = router;
