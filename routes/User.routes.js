const express = require("express");

const { UserModel } = require("../models/User.model");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const userRouter = express.Router();

// R E G I S T R A T I O N

userRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  let temp = email.split("@");
  console.log(temp[1]);
  let role;
  if (temp[1] == "masaischool.com") {
    role = "admin";
  } else {
    role = "user";
  }

  try {
    bcrypt.hash(password, 8, async (err, hashedPassword) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({
          name,
          email,
          password: hashedPassword,
          role,
        });
        await user.save();
        res.send("Registration Successfull");
      }
    });
  } catch (err) {
    res.send("Error in Registration");
    console.log(err);
  }
});

// L O G I N
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.find({ email });

    if (user.length > 0) {
      const hashed_Password = user[0].password;
      const role = user[0].role;
      bcrypt.compare(password, hashed_Password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "masai", {
            expiresIn: "2h",
          });
          res.send({ msg: "Login Successfull", token: token, role: role });
        } else {
          res.send("Wrong Credentials");
        }
      });
    } else {
      res.send("Failed to Login");
    }
  } catch (err) {
    res.send("Something Went Wrong");
    console.log(err);
  }
});

module.exports = {
  userRouter,
};
