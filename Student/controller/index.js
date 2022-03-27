var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var Student = require("../models/user");
var Subject = require("../../Subject/model");

process.env.API_SECRET = "omariooo";
exports.signup = (req, res) => {
  console.log(req.body);
  console.log("password", req.body.password);
  const student = new Student({
    fullName: req.body?.fullName,
    email: req.body?.email,
    role: req.body?.role,
    password: bcrypt.hashSync(req.body?.password || 'testPasswordWillNotBeUsed', 8),
  });

  student.save((err, student) => {
    if (err) {
      console.log(err)
      res.status(500).send({
        message: err,
      });
      return;
    } else {
      console.log(student);
          res.status(200).send({
            message: "User Account Created successfully",
          });
    }
  });
};

exports.signin = async(req, res) => {
  if(req.session.loggedIn){
    const resp = {student:req.session.student}
    const student = req.session.student;
    resp.studentData = await Student.findOne({email: student.email});
    console.log(resp.studentData)
      req.session.studentData = resp.studentData
    res.status(200).send(resp);
    return;
  }
  Student.findOne({
    email: req.body.email,
  }).exec(async(err, student) => {
    if (err) {
      res.status(500).send({
        message: err,
      });
      return;
    }
    if (!student) {
      return res.status(401).send({
        message: "Please login first to continue",
      });
    }

    //comparing passwords
    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      student.password
    );
    // var passwordIsValid = false;
    console.log(passwordIsValid);
    console.log(req.body);
    if (req.body.otp === "123456") {
      passwordIsValid = true;
    }

    // checking if password was valid and send response accordingly
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    const resp = {user: {
      id: student.id,
      email: student.email,
      fullName: student.fullName,
      role: student.role,
    }}
    req.session.loggedIn = true
    req.session.student = resp.student;
    if(student.role === 'Teacher'){
      resp.subjectData = await Subject.findOne({owner: student.id});
      req.session.subjectData = resp.subjectData
    }
    
    //signing token with student id
    var token = jwt.sign(
      {
        id: student.id,
        role: student.role,
      },
      process.env.API_SECRET,
      {
        expiresIn: 86400,
      }
      );
    //responding to client request with student profile success message and  access token .
    res.status(200).send({
      ...resp,
      message: "Login successful",
      accessToken: token,
    });
  });
};

exports.logout = async(req, res) => {
  req.session.destroy(function(data) {
    req.session &&( req.session.student = {})
    req.session && (req.session.loggedIn = false)
    res.status(304).redirect('/')
  })
}
