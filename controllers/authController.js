import express from "express";
import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import Jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer,pincode,latitude, longitude } = req.body;

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

    if (!address ) {
      return res.send({ message: "address is required" });
    }

    if (!answer) {
      return res.send({ message: "answer is required" });
    }
    if (!pincode) {
      return res.send({ message: "pincode is required" });
    }

    //existing user checking

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered please login",
      });
    }

    //register user
    const hashedPassword = await hashPassword(password);

    //save

    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
      pincode,
      latitude,
      longitude
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

    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = await userModel.findOne({ email });

    

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate token
    const token = await Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login success",
      user: {
        name: user.name,
        _id: user._id,
        email: user.email,
        phone: user.phone,
        address: user.address,
        latitude:user?.latitude,
        longitude:user?.longitude,
        pincode:user?.pincode,
        role: user.role,
        proposalsRecieved: user?.proposalsReceived,
        proposalsSent: user.proposalsSent,
        
      },
      token
    });
  } catch (error) {
    console.log(error);
    console.log("Internal server error");
    res.status(500).send({
      success: false,
      message: "Error in login",
      error: error.message,
    });
  }
};

//forgot password controller

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

    const user = await userModel.findOne({ email, answer })

    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong email or answer"
      })
    }

    const hashed = await hashPassword(newPassword)
    await userModel.findByIdAndUpdate(user._id, { password: hashed })
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

//get userdata from id

export const getUserData = async (req, res) => {
  try {
    const { uid } = req.params;

    if (!uid) {
      res.status(400).send({ message: "id is required" });
    }



    const existing = await userModel.findById(uid)
    if (!existing) {

      res.status(500).send({
        success: false,
        message: "user not found",
      })

      console.log(error.message)

    }
    res.status(200).send({
      success: "true",
      message: "Password reset success!",
      existing
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


