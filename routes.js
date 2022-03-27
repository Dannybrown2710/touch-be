const menuRoutes = require('./Menu/routes')
const studentRoutes = require('./Student/routes')
const teacherRoutes = require('./Subject/routes')
const express = require('express');
const router = express.Router();

const defaultRoutes = [
  {
    path: '/menu',
    route: menuRoutes,
  },
  {
    path: '/user',
    route: studentRoutes,
  },
  {
    path: '/subjects',
    route: teacherRoutes,
  },
  
];

defaultRoutes.forEach((route) => {
  console.log(route);
  router.use(route.path, route.route);
});
module.exports = router;