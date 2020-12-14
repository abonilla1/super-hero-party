const Hero = require("../models/hero");
const axios = require("axios");


module.exports = {
    index,
    new: newHero,
    search,
    show,
    
}


function newHero(req, res) {
    res.render("heroes/new", {
        user: req.user,
        results: null,
    })
}

function search(req, res) {
    axios.get(`https://superheroapi.com/api/106220101357993/search/${req.body.query}`)
    .then((response) => {
        console.log(response.data.results)
        res.render("heroes/new", {
            user: req.user,
            results: response.data.results
        })
    })
}

function show(req, res) {
    axios.get(`https://super/api/106220101357993/`)
})