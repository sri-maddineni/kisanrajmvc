import express from "express";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import Jwt from "jsonwebtoken";
import KisanUserModel from "../models/KisanUserModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    if (!name) {
      return res.send({ message: "Name is required" });
    }

    if (!email) {
      return res.send({ message: "email is required" });
    }

    if (!password) {
      return res.send({ message: "password is required" });
    }

    if (!phone) {
      return res.send({ message: "phone no is required" });
    }

    if (!address) {
      return res.send({ message: "address is required" });
    }

    if (!answer) {
      return res.send({ message: "answer is required" });
    }

    //existing user checking

    const existingUser = await KisanUserModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered please login",
      });
    }

    //register user
    const hashedPassword = await hashPassword(password);

    //save

    const user = await new KisanUserModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer
    }).save();

    res.status(201).send({
      success: true,
      message: "Registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

//login controller

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "invalid email or password",
      });
    }

    const user = await KisanUserModel.findOne({ email });

    if (!user) {
      console.log("user not found");
      res.status(404).send({
        message: "User not found!",
        success: false,
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "invalid password",
      });
    }

    //token

    const token = await Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "login success",
      user: {
        name: user.name,
        _id: user._id,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role:user.role
      },
      token
    });
  } catch (error) {
    console.log(error);
    console.log("500 error")
    res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};

//forgor password controller

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }

    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }

    if (!newPassword) {
      res.status(400).send({ message: "newPassword is required" });
    }

    //check email and answer

    const user = await KisanUserModel.findOne({ email, answer })

    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong email or answer"
      })
    }

    const hashed = await hashPassword(newPassword)
    await KisanUserModel.findByIdAndUpdate(user._id, { password: hashed })
    res.status(200).send({
      success: "true",
      message: "Password reset success!"
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error
    })
  }
}

export const testController = (req, res) => {
  res.send({
    message: "hello world",
  });
  console.log("protected route");
};
