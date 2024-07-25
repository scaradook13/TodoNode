// Import the model from the models folder
const bcrypt = require("bcryptjs");
const Task = require("../models/TodoModel");
const User = require("../models/UserModel");
// Add single task
exports.createTask = async function (req, res) {
  console.log(req.user.username);
  console.log(req.body);
  const { taskName } =  req.body;
  try {
    // Query the user currently login to get the field tasklist
    const getCurrentUser = await User.findOne({ username: req.user.username });

    const newTask = new Task({
      taskName: taskName,
    });

    // Saving the Task to Task Model
    await newTask.save();

    getCurrentUser.taskList.push(newTask);

    res.status(200).json({
      message: "Task added to " + getCurrentUser.username,
    });

    await getCurrentUser.save();
  } catch (err) {
    res.status(400).json({
      response: err,
    });
  }
};
// Update single task
exports.updateTask = async function (req, res) {
  console.log(req.body.id);
  console.log(req.body);
  try {
    const updatedData = await Task.findByIdAndUpdate(
      req.body.id,
      {
        taskName: req.body.taskName,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    console.log(updatedData);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};
// Delete Task
exports.deleteTask = async function (req, res) {
  console.log(req.body.id);
  try {
    const deletedTask = await Task.findByIdAndDelete(req.body.id);
    if (deletedTask) {
      return res.redirect("/");
    }
  } catch (err) {
    console.error("Error deleting task : ", err);
  }
};
  
exports.changePassword = async function (req, res){
  const { currentPassword } = req.body;
  const { verifyPassword } = req.body;
  const { newPassword } = req.body;
  try{
    const checkUser = await User.findOne({ username: req.user.username }).exec();
    const passwordMatch = await bcrypt.compare(currentPassword, checkUser.password);
    if (!passwordMatch) {
      return res.status(401).json({
        content: "Password is incorrect",
      });
    }
    const checkNewpassword = await bcrypt.compare(newPassword, checkUser.password);
    if (checkNewpassword) {
      return res.status(401).json({
        content: "New password must be different from the current password",
      });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    checkUser.password = hashedNewPassword;
    
    await checkUser.save();

    return res.status(200).json({
      content: "Password updated successfully",
    });
  }

  catch(err){
    console.log(err);
  }
}


exports.logOut = async function(req, res) {
    try {
        res.clearCookie("jwt");

        return res.status(200).json({
          content: "Logout successfully",
        });
    } catch(err) {
      res.status(200).json({
        response: err,
      });
    }
}

exports.toggleCheckbox = async function (req, res) {
  try {
    const updatedData = await Task.findByIdAndUpdate(
      req.body.id,
      {
        isFinished: req.body.isFinished,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    console.log(updatedData);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};