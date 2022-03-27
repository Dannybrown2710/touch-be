var Subject = require("../model/index");
var Student = require("../../Student/models/user");
const getSubject = (req, res) => {
  console.log(req.student);
  if(!req.session.student){
    res.status(403).send('Unauthorised');
    return;
  }
  Subject.find({}).exec((err, Subjects) => {
    if (err) {
      res.status(500).send({
        message: err,
      });
      return;
    }
    if (!Subjects) {
      return res.status(404).send({
        message: "Subjects Not found.",
      });
    }
    const SubjectData = Subjects;
    const data = SubjectData.map(s => {
      const d = s.toJSON();delete d.students;
      return d;
    });
    res.send(data);
  });
};

const editSubject = async (req, res) => {
  console.log(req.session);
  if(req.session.student && req.session.student.role === 'Admin'){
    const student = req.session.student;
    const Subject = await Subject.findOne({owner: student.id});
    console.log(Subject);
    if(!Subject){
      res.status(503).send({message:"Subject not found"});
      return;
    }else{
      for(let key of Object.keys(req.body)){
        Subject[key] = req.body[key];
      }
      Subject.save();
      res.status(200).send({message:"Subject updated successfully"});
    }
  } else {
    res.status(403).send({message: 'Unauthorised'})
  }
}


const addMenuItemToSubject = async (req, res) => {
  console.log(req.session);
  if(req.session.student && req.session.student.role === 'Subject'){
    const student = req.session.student;
    const Subject = await Student.findOne({owner: student.id});
    console.log(Subject);
    if(!Subject){
      res.status(503).send({message:"Subject not found"});
      return;
    }else{
      Subject.menu.push(req.body)
      Subject.save();
      res.status(200).send({message:"Menu Item updated successfully"});
    }
  } else {
    res.status(403).send({message: 'Unauthorised'})
  }
}


const editMenuItemToSubject = async (req, res) => {
  console.log(req.session);
  if(req.session.student && req.session.student.role === 'Admin'){
    const student = req.session.student;
    const Subject = await Subject.updateOne({owner: student.id,"menu._id":req.body._id},{$set:{"menu.$":req.body}});
    console.log(Subject);
    if(!Subject){
      res.status(503).send({message:"Subject not found"});
      return;
    }else{
      res.status(200).send({message:"Subject updated successfully"});
    }
  } else {
    res.status(403).send({message: 'Unauthorised'})
  }
}


const deleteMenuItemToSubject = async (req, res) => {
  console.log(req.session);
  if(req.session.student && req.session.student.role === 'Admin'){
    const student = req.session.student;
    const subject = new Subject();
    console.log(Subject);
    if(!Subject){
      res.status(503).send({message:"Subject not found"});
      return;
    }else{
      res.status(200).send({message:"Subject updated successfully"});
    }
  } else {
    res.status(403).send({message: 'Unauthorised'})
  }
}

const addSubject = async (req, res) => {
  console.log(req.session);
  if(req.session.student && req.session.student.role === 'Teacher'){
    const student = req.session.student;
    console.log("password", req.body.password);
    const subject = new Subject({
      name: req.body?.name,
      owner: student.id
    });
  
    subject.save((err, subject) => {
      if (err) {
        console.log(err)
        res.status(500).send({
          message: err,
        });
        return;
      } else {
        console.log(subject);
            res.status(200).send({
              message: "Subject Created successfully",
            });
      }
    });
  } else {
    res.status(403).send({message: 'Unauthorised'})
  }
}
const addStudentToSubject = async (req, res) => {
  console.log(req.session);
  if(req.session.student && req.session.student.role === 'Teacher'){
    const user = req.session.student;
    const subject = await Subject.findOne({owner: user.id, name: req.body.name});
    
    if(!subject){
      res.status(503).send({message:"Subject not found"});
      return;
    }else{
      const userToAdd = await Student.findOne({email: req.body.user})
      console.log(userToAdd);
      if(!userToAdd){
        res.status(503).send({message:"User not found"});
        return;
      } else {
        subject.students.push(userToAdd.id)
        subject.students = [...new Set(subject.students)];
        subject.save();
        res.status(200).send({message:"Subject Students updated successfully"})
      }
    }
  } else {
    res.status(403).send({message: 'Unauthorised'})
  }
}
const addLink = async (req, res) => {
  console.log(req.session);
  if(req.session.student && req.session.student.role === 'Teacher'){
    const student = req.session.student;
    const subject = await Subject.findOne({owner: student.id, name: req.body.name});
    if(!subject){
      res.status(503).send({message:"Subject not found"});
      return;
    }else{
      subject.links.push(req.body.link)
      subject.save();
      res.status(200).send({message:"Subject Links updated successfully"});
    }
  } else {
    res.status(403).send({message: 'Unauthorised'})
  }
}





module.exports = {
  getSubject,
  // editSubject,
  // addMenuItemToSubject,
  // editMenuItemToSubject,
  addSubject,
  addLink,
  addStudentToSubject,
  // deleteMenuItemToSubject
};
