const router = require("express").Router();
const messagesCtrl = require('../controllers/messages')


router.post("/", isLoggedIn, messagesCtrl.create)
router.get("/", isLoggedIn, messagesCtrl.index) 
router.delete("/:id", isLoggedIn, messagesCtrl.delete)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;
