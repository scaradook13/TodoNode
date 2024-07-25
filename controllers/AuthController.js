const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
exports.login = async function (req, res) {
  const { username, password } = req.body;
  try {
    // Check if the user is present on the database
    const checkUser = await User.findOne({ username }).exec();
    if (!checkUser) {
      res.status(403).json({
        content: username + "not found",
      });
    }
    console.log(checkUser);

    // Comparing password from user to the database
    const passwordMatch = await bcrypt.compare(password, checkUser.password);
    if (!passwordMatch) {
      return res.status(401).json({
        content: "Password is incorrect",
      });
    }

    // Generate JWTOKEN
    const accessToken = jwt.sign(
      { username: checkUser.username },
      "my_secret",
      { expiresIn: "1h" }
    );
    console.log(res.cookie);
    // Save token to cookies
    res.cookie("jwt", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      content: accessToken,
    });

    console.log(accessToken);
  } catch (err) {}
};
