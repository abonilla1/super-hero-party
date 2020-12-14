const Hero = require("../models/hero");
const axios = require("axios");



module.exports = {
    index,
    new: newHero,
    search,
    show,
    
}

function index (req, res) {
    Hero.find({ addedBy: req.user._id })
        .then((heroes) => {
            res.render('heroes/index', {
            user: req.user,
            heroes
        })
    })
}


function newHero(req, res) {
    res.render("heroes/new", {
        user: req.user,
        results: null,
    })
}

function search(req, res) {
    axios.get(`https://superheroapi.com/api/${process.env.API_KEY}/search/${req.body.query}`)
    .then((response) => {
        console.log(response.data.results)
        res.render("heroes/new", {
            user: req.user,
            results: response.data.results
        })
    })
}

function show(req, res) {
    console.log(req.params.id)
    axios.get(`https://superheroapi.com/api/${process.env.API_KEY}/${req.params.id}`)
    .then((response) => {
        Hero.findOne({ id: response.data.id})
        .then((hero) => {
            if (hero) {
                res.render("heroes/show", {
                    user: req.user,
                    hero: response.data
                });
            }
            else {
                res.render("heroes/show", {
                    user: req.user,
                    hero: response.data
                });
            }
        })
    })
}