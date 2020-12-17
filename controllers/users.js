const User = require("../models/user");
const Hero = require("../models/hero");

module.exports = {
    index,
    showProfile
}

function index(req, res) {
    
}

function showProfile(req, res) {
    User.findById(req.user._id).then((user) => {
        res.render("users/profile", {user})
    })
}