const router = require("express").Router();
const heroesCtrl = require("../controllers/heroes")

router.get("/new", isLoggedIn, heroesCtrl.new)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
}


module.exports = router