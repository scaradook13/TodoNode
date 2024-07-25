// Import the library or dependency
// ES5 Javascript
const mongoose = require("mongoose");

// Create Structure or Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  taskList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

// Create model and assign schema
const User = mongoose.model("User", userSchema);

module.exports = User;

async function isUsernameTaken(username) {
  const existingUser = await User.findOne({ username: username });
  return !!existingUser;
}

module.exports.isUsernameTaken = isUsernameTaken;
