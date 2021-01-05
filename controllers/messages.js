const Message = require('../models/message')

module.exports = {
  index,
  create,
  reply,
  delete: deleteMessage
}

function index(req, res) {
  Message.find({}).then((messages) => {
    res.render("home/index", {
      user: req.user,
      messages: messages.reverse()
    })
  })
}

function create(req, res) {
  req.body.postedBy = req.user.nickname
  req.body.avatar = req.user.avatar
  Message.create(req.body)
  .then(() => {
    res.redirect("/home")
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

function deleteMessage(req, res) {
  Message.findByIdAndDelete(req.params.id).then(() => {
    res.redirect("/home")
  })
}