const express = require('express');
const router = express.Router();
const { expressjwt: expressJwt } = require('express-jwt');
const auth = require('../controllers/authMiddleware');

const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip);

router  
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode) 
    .put(auth,tripsController.tripsUpdateTrip) ; 

router
    .route('/login')
    .post(authController.login);
router
    .route('/register')
    .post(authController.register);


module.exports = router;