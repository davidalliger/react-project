const express = require('express');
const asyncHandler = require('express-async-handler');
const {Review, User, Image} = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const {handleValidationErrors} = require('../../utils/validation');
const { check, body } = require('express-validator');


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

const validateReview = [
    check('rating')
        .exists({ checkFalsy: true })
        .withMessage('Please give this haunt a rating.')
        .if(check('rating').exists({checkFalsy: true}))
        .custom(value => Number(value) > 0 && Number(value) < 6)
        .withMessage('Rating must be an integer between 1 and 5.'),
    check('content')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a review.'),
    handleValidationErrors
];

router.post('/', requireAuth, validateReview, asyncHandler(async (req, res) => {
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
    await Review.update({
        userId: userId,
        hauntId: hauntId,
        rating: rating,
        content: content
    },
        {
            where: {
                id: id
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
