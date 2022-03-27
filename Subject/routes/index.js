const express = require('express');
const verifyToken = require('../../Student/middleware/verify');
const router = express.Router();
const teacherController = require('../controller')
router.get('/', teacherController.getSubject )
// router.put('/',teacherController.editTeacher)
// router.post('/add',teacherController.addMenuItemToTeacher)
router.post('/add',teacherController.addSubject)
router.put('/addLinkToSubject',teacherController.addLink)
router.put('/addStudentToSubject',teacherController.addStudentToSubject)
// router.put('/editMenuItem',teacherController.editMenuItemToTeacher)
// router.put('/deleteMenuItem',teacherController.deleteMenuItemToTeacher)
module.exports = router;    