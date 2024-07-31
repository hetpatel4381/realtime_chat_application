import { response } from "express";
import User from "../models/UserModel";

const signUp = async (req, res) => {
  try {
    // get the email and password from req.body and validate it.
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and Password Required!");
    }

    // if we get the email and password, then first check in DB if the user exist or not.
    const user = await User.findOne({ email });
    if (user) {
      return res.status(404).send("User already Exists!");
    }

    // if user doesn't exists then create one.
    const newUser = await User.create({
      email,
      password,
    });

    // exclude password from the data we get in response.
    const userCreated = await User.findById(newUser._id).select("-password");
    if (!userCreated) {
      return res.status(500, "Something went wrong while signing new user!");
    }

    // return the response when everything is perfect.
    return res.status(201).json(userCreated, "User Created Successfully!");
  } catch (error) {
    console.log({ error });
    return res.status(500).send("Internal Server Error");
  }
};

export { signUp };
