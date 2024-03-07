const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
router.get('/signup', (req, res) => {
    res.render('signup');
});


router.post('/signup', authController.signup);
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', authController.login);

router.post('/logout', authMiddleware.authenticateToken, authController.logout);

module.exports = router;
