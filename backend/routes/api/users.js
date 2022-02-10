const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const bcrypt = require('bcryptjs')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Image } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('username')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a username.')
        .if(check('username').exists({checkFalsy: true}))
        .isLength({ min: 4 })
        .withMessage('Username must be at least 4 characters long.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email address.'),
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a valid email address.')
        .if(check('email').exists({checkFalsy: true}))
        .isEmail()
        .withMessage('Please provide a valid email address.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.')
        .if(check('password').exists({checkFalsy: true}))
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long.'),
    check('confirmPassword')
        .if(check('password').exists({checkFalsy: true}).isLength({ min: 6 }))
        .exists({ checkFalsy: true })
        .withMessage('Please confirm password.')
        .if(check('confirmPassword').exists({checkFalsy: true}))
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Password and Confirm Password fields must match.'),
    handleValidationErrors
];

router.post('/', validateSignup, asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const newUser = await User.create({
        username,
        email,
        hashedPassword
    });
    const user = await User.scope('currentUser').findOne({
        where: {
            id: newUser.id
        },
        include: [Image]
    });

    await setTokenCookie(res, user);

    return res.json({
        user
    });
}));

module.exports = router;
