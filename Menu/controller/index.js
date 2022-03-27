const Teacher = require('../../Subject/model')
const getMenu = async(req,res) => {
    const restro = await Teacher.findOne({_id:req.params.teacherId});
    res.status(200).send({menu: restro.menu} );
}
module.exports = {
    getMenu
}