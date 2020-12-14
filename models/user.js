const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    nickname: String,
    email: String,
    avatar: String,
    googleId: String,
    superTeam: [{type: Schema.Types.ObjectId, ref: "Hero"}],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
