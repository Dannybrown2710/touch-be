const express = require('express');
const verifyToken = require('../../Student/middleware/verify');
const router = express.Router();
const teacherController = require('../controller')
router.get('/', teacherController.getTeacher )
router.put('/',teacherController.editTeacher)
router.post('/add',teacherController.addMenuItemToTeacher)
router.put('/editMenuItem',teacherController.editMenuItemToTeacher)
router.put('/deleteMenuItem',teacherController.deleteMenuItemToTeacher)
module.exports = router;