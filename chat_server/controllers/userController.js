import User from "../models/UserModel.js";
import { config } from "../config/index.js";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { renameSync, unlinkSync } from "fs";

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
    return res.status(201).json(userCreated);
  } catch (error) {
    console.log({ error });
    return res.status(500).send("Internal Server Error");
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email || password)) {
      return res.status(400).send("Email Id and Password Required!");
    }

    const validUser = await User.findOne({ email });

    if (!validUser) {
      return res.status(404).send("Invalid Credentials");
    }

    const validPassword = compare(password, validUser.password);

    if (!validPassword) {
      return res.status(404).send("Invalid Credentials");
    }

    const token = jwt.sign({ id: validUser._id, email }, config.jwtKey, {
      expiresIn: "1D",
    });

    const loggedInUser = await User.findById(validUser._id).select("-password");

    const options = {
      // httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", token, options)
      .json({
        user: {
          id: loggedInUser.id,
          email: loggedInUser.email,
          profileSetup: loggedInUser.profileSetup,
          firstName: loggedInUser.firstName,
          lastName: loggedInUser.lastName,
        },
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error Encounter while login in User!");
  }
};

const getUserInfo = async (req, res) => {
  try {
    const userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).send("User with given ID not found!");
    }

    return res.status(200).json({
      id: userData.id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
    });
  } catch (error) {
    return res.status(500).send("Internal Server Error!");
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId } = req;
    const { firstName, lastName, color } = req.body;

    if (!firstName || !lastName || color === undefined) {
      return res
        .status(400)
        .send("First-Name, Last-Name and Color is Required!");
    }

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        color,
        profileSetup: true,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      id: userData.id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
    });
  } catch (error) {
    return res.status(500).send("Internal Server Error!");
  }
};

const addProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("File is required!");
    }

    const date = Date.now();
    let filename = "uploads/profiles/" + date + req.file.originalname;
    renameSync(req.file.path, filename);

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { image: filename },
      { new: true, runValidators: true }
    );

    return res.status(200).json({ image: updatedUser.image });
  } catch (error) {
    return res
      .status(500)
      .send("Something went wrong while adding profile image!");
  }
};

const removeProfileImage = async (req, res) => {
  try {
    const { userId } = req;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not Found!");
    }

    if (user.image) {
      unlinkSync(user.image);
    }

    user.image = null;
    await user.save();

    return res.status(200).send("Profile Image Removed Successfully!");
  } catch (error) {
    return res.status(500).send("Cannot delete profile image!");
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("accessToken", "", {
      maxAge: 1,
      secure: true,
      sameSite: "None",
    });

    return res.status(200).send("Logout Successful!");
  } catch (error) {
    return res.status(500).send("Error while logging out the user!");
  }
};

export {
  signUp,
  logIn,
  getUserInfo,
  updateProfile,
  addProfileImage,
  removeProfileImage,
  logout,
};
