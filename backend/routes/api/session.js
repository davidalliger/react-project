const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Image } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/', restoreUser, (req, res) => {
    const { user } = req;
    const userSafe = user.toSafeObject();
    const restoredUser = {
        ...userSafe,
        Images: user.dataValues.Images
    }
    if (user) {
        return res.json({
            user: restoredUser
        });
    } else return res.json({});
});

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        // .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];

router.post('/', validateLogin, asyncHandler(async(req, res, next) => {
    const { credential, password } = req.body;
    console.log('credential ', credential);
    console.log('password ', password);
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
        where: {
            [Op.or]: {
                username: credential,
                email: credential
            }
        }
    });
    console.log('user ', user);
    let loggedInUser;
    if (user && user.validatePassword(password)) {
        loggedInUser = await User.scope('currentUser').findOne({
            where: {
                id: user.id
            },
            include: [Image]
        });
    }
    console.log('loggedInUser ', loggedInUser);

    if (!loggedInUser) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
    }

    await setTokenCookie(res, loggedInUser);

    return res.json({
        loggedInUser
    });
}));

router.delete('/', (req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
});

module.exports = router;
