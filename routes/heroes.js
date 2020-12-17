const router = require("express").Router();
const heroesCtrl = require("../controllers/heroes")



router.post("/", isLoggedIn, heroesCtrl.addToTeam)
router.get("/new", isLoggedIn, heroesCtrl.new)
router.get("/", isLoggedIn, heroesCtrl.index)
router.delete("/:id", isLoggedIn, heroesCtrl.delete)
router.get("/:id", isLoggedIn, heroesCtrl.show)
// router.post("/:id", isLoggedIn, heroesCtrl.createRating)
router.post("/search", isLoggedIn, heroesCtrl.search)


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
}


module.exports = router