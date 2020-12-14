const Hero = require("../models/hero");
const axios = require("axios");


module.exports = {
    new: newHero,
    search,
}


function newHero(req, res) {
    res.render("heroes/new", {
        user: req.user,
        results: null,
    })
}

function search(req, res) {
    
}