const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, body } = require('express-validator');
const { Spooking, Haunt, Image, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/', requireAuth, asyncHandler(async (req, res) => {
    const { userId } = req.query;
    const spookings = await Spooking.findAll({
        where: { userId },
        include: {
            model: Haunt,
            include: [
                {
                    model: Image,
                },
                {
                    model: User,
                    include: [Image]

                },
            ],
            order: [[Image,'id', 'ASC']]
        }
    });
    return res.json(spookings);
}));

const checkValidDuration = (req, res, next) => {
    let isValidDuration = false;
    const { startDate, endDate } = req.body;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start < end) {
        isValidDuration = true;
    }
    req.body.isValidDuration = isValidDuration;
    next();
}

const validateSpooking = [
    check('userId')
        .exists({ checkFalsy: true })
        .withMessage('Must be logged in to spook a trip.'),
    check('hauntId')
        .exists({ checkFalsy: true })
        .withMessage('Spookings can only be made for valid haunts.'),
    check('isValidDuration').custom((value) => {
            if (value === false) {
                throw new Error('Check-in date must be before check-out date.');
            } else {
                return true;
            }
        }),
    check('polterguests')
        .custom(value => Number(value) > 0)
        .withMessage('Number of polterguests must be greater than 0.'),
    handleValidationErrors
];

router.post('/', requireAuth, checkValidDuration, validateSpooking, asyncHandler(async (req, res) => {
    const {
        userId,
        hauntId,
        startDate,
        endDate,
        polterguests
    } = req.body;
    const spooking = await Spooking.create({
        userId,
        hauntId,
        startDate,
        endDate,
        polterguests
    });
    return res.json({
        spooking
    });
}));

module.exports = router;
