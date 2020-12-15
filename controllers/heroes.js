const Hero = require("../models/hero");
const axios = require("axios");


module.exports = {
    index,
    new: newHero,
    search,
    show,
    addToTeam
  
    
}

function index (req, res) {
    res.render('heroes', {
        user: req.user,
        heroes
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
        res.render("heroes/new", {
            user: req.user,
            results: response.data.results
        })
    })
}

function show(req, res) {
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

function addToTeam(req, res) {
    Hero.findOne({apiId: parseInt(req.body.hero)})
    console.log(hero)
    .then((hero) => {
      if (hero) {
        hero.save()
        .then(() => {
          res.redirect(`/heroes`)
        })
      } else {
        Hero.create(axios.get(`https://superheroapi.com/api/${process.env.API_KEY}/${id}`))
        .then(() => {
          res.redirect(`/heroes`)
        })
      }
    })
}