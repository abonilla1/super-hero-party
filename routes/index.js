const router = require("express").Router();
const messagesCtrl = require('../controllers/messages')


router.post("/", isLoggedIn, messagesCtrl.create)
router.get("/", isLoggedIn, messagesCtrl.index) 

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;
