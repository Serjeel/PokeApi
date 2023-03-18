const express = require('express');
const router = express.Router();
const passport = require('passport');

const { 
    getAllUsers,
    login,
    register,
    protect,
    changeFavorites
 } = require('../controllers/userController');

router.get('/getAllUsers', getAllUsers);
router.post('/register', register);
router.post('/login', login);
router.get('/protect', passport.authenticate('jwt', { session: false }), protect);
router.post('/changeFavorites', passport.authenticate('jwt', { session: false }), changeFavorites);

module.exports = router;