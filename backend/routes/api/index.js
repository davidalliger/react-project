const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const hauntsRouter = require('./haunts.js');
const spookingsRouter = require('./spookings.js');
const reviewsRouter = require('./reviews.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/haunts', hauntsRouter);

router.use('/spookings', spookingsRouter);

router.use('/reviews', reviewsRouter);

module.exports = router;
