const express = require('express');
const verifyToken = require('../../Student/middleware/verify');
const router = express.Router();
const menuController = require('../controller/')
router.get('/:teacherId',verifyToken, menuController.getMenu )
module.exports = router;