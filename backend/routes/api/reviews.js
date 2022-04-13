const express = require('express');
const asyncHandler = require('express-async-handler');
const {Review, User, Image} = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const {handleValidationErrors} = require('../../utils/validation');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const reviews = await Review.findAll({
        include: {
            model: User,
            include: [Image]
        }
    });
    return res.json(reviews);
}));

router.post('/', requireAuth, asyncHandler(async (req, res) => {
    const {
        userId,
        hauntId,
        rating,
        content
    } = req.body;
    const newReview = await Review.create({
        userId,
        hauntId,
        rating,
        content
    });
    const review = await Review.findOne ({
        where: { id: newReview.id },
        include: {
            model: User,
            include: [Image]
        }
    });
    return res.json( {
        review
    });
}));

router.put('/:id', requireAuth, asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {
        userId,
        hauntId,
        rating,
        content
    } = req.body;
    await Review.update(
        userId,
        hauntId,
        rating,
        content,
        {
            where: {
                id
            }
        }
    );

    const review = await Review.findOne({
        where: {
            id
        },
        include: {
            model: User,
            include: [Image]
        }
    });

    return res.json({
        review
    });
}));

router.delete('/:id', requireAuth, asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Review.destroy({
        where: { id }
    });

    return res.json({ id });
}));

module.exports = router;
