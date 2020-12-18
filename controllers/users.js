const User = require("../models/user");
const Hero = require("../models/hero");

module.exports = {
    index,
    showProfile,
    update
}

function index(req, res) {
    User.find({}).then((users) => {
    res.render("users", {user: req.user, users }
    )})
    
}

function showProfile(req, res) {
    User.findById(req.user._id).then((user) => {
        res.render("users/profile", {user})
    })
}

function update(req, res) {
    User.findByIdAndUpdate(req.user._id, req.body, {new:true}).then((user) => {
        res.redirect("/users/profile")
    })
}