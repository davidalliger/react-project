const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, body } = require('express-validator');

const { Spooking } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
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
