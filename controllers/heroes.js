const Hero = require("../models/hero");
const User = require("../models/user");
const axios = require("axios");


module.exports = {
    index,
    new: newHero,
    search,
    show,
    addToTeam
  
    
}

function index(req, res) {
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
        res.render("heroes/new", {
            user: req.user,
            results: response.data.results
        })
    })
}

function show(req, res) {
    axios.get(`https://superheroapi.com/api/${process.env.API_KEY}/${req.params.id}`)
    .then((response) => {
        Hero.findOne({ id: response.data.id}).populate('addedBy')
        .then((hero) => {
            if(hero) {
                res.render("heroes/show", {
                    user: req.user,
                    hero: response.data,
                    addedBy: hero.addedBy,
                });
            }
            else {
                res.render("heroes/show", {
                    user: req.user,
                    hero: response.data,
                    addedBy: [""]
                });
            }
        })
    })
}

function addToTeam(req, res) {
    Hero.findOne({ apiId: parseInt(req.body.apiId) })
    .then((hero) => {
      if (hero) {
        hero.addedBy.push(req.user._id)
        hero.save()
        .then(() => {
          res.redirect(`/heroes`)
        })
      } else {
        console.log(hero)
        req.body.addedBy = req.user._id
        Hero.create(req.body)
        .then(() => {
          res.redirect(`/heroes`)
        })
      }
    })
}