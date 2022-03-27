const jwt = require("jsonwebtoken");
const Student = require("../models/user");
const Teacher = require("../../Subject/model");

const verifyToken = async (req, res, next) => {
    console.log("Verifying")
    console.log(req.headers.authorization)
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET, function (err, decode) {
      if (err) req.student = undefined;
      Student.findOne({
          _id: decode.id
        })
        .exec(async(err, student) => {
          if (err) {
            res.status(500)
              .send({
                message: err
              });
          } else {
            req.student = student;
            if(student.role == 'Admin'){
              req.teacherData = await Teacher.find({owner:student.id})
            }
            next();
          }
        })

  
    });
  } else {
    req.student = undefined;
    next();
  }
};
module.exports = verifyToken;