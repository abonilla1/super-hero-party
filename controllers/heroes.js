const Hero = require("../models/hero");
const User = require("../models/user");
const axios = require("axios");


module.exports = {
    index,
    new: newHero,
    search,
    show,
    addToTeam,
    createRating,
    delete: deleteHero
  
    
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
                    ratings: hero.ratings,
                });
            }
            else {
                res.render("heroes/show", {
                    user: req.user,
                    hero: response.data,
                    addedBy: [""],
                    ratings: [""]
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

function createRating(req, res) {
  Hero.findById(req.params.id).then((hero) => {
    hero.rating.push(req.body.ratings)
    hero.save()
    console.log(hero)
      .then(() => {
        res.render(`heroes/${hero.apiId}`)
      })
  })
}

function deleteHero(req, res){
  Hero.findByIdAndDelete(req.params.id).then((hero) => {
    res.redirect('/heroes')
  })
}