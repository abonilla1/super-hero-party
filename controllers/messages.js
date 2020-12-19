const Message = require('../models/message')

module.exports = {
  index,
  create,
  reply
}

function index(req, res) {
  Message.find({})
  .then((messages) => {
    res.render("index", {
      user: req.user,
      messages: messages.reverse()
    })
  })
}

function create(req, res) {
  req.body.postedBy = req.user.nickname
  Message.create(req.body)
  .then(() => {
    res.redirect("/index")
  })
}


function reply(req, res) {
  Message.findById(req.params.id)
  .then((message) => {
    req.body.postedBy = req.user.name
    message.replies.push(req.body)
    message.save()
    .then(() => {
      res.redirect(`/messages/${message._id}`)
    })
  })
}