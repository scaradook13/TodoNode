// Import the model from the models folder
// const Task = require("../models/TodoModel");
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");

exports.registerAccount = async function (req, res) {
  const { username, password } = req.body;
  try {
    // Check if username already exists
    const usernameTaken = await User.isUsernameTaken(username);
    
    if (usernameTaken) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username: username,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({
      user: newUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const foundUser = User.find().exec();
    if (foundUser) {
      return res.status(200).json({
        status: "Success",
        content: foundUser,
      });
    }
    return res.send("No users found");
  } catch (err) {
    console.log(err);
  }
};
