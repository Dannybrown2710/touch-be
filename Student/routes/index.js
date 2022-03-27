var express = require("express"),
  router = express.Router(),
  {
    signup,
    signin,
    logout
  } = require("../controller/");

router.post("/register", signup, function (req, res) {
});

router.post("/login", signin, function (req, res) {

});
router.get("/logout", logout ,function (req, res) {})

module.exports = router;