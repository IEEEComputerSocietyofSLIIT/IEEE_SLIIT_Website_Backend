// authRoutes.js
const express = require('express');
const authController = require('../controllers/adminAuthController');

const router = express.Router();

router.post('/admin/login', authController.login);

module.exports = router;
