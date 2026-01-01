import authConfigs from "../config/auth.config.js";
import User from "../models/user.models.js";
import bcrypt from "bcrypt";

// REGISTER
const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.toString(),
    });
  }
};

// LOGIN
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = authConfigs.encodeToken(user.email, user._id.toString());

    res.cookie("user-token", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Successfully logged in",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.toString(),
    });
  }
};

// GET ALL USERS (For testing)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.toString(),
    });
  }
};

// TRACK EVENT
const trackEvent = async (req, res) => {
  try {
    const userId = req.user._id;
    const { eventId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if already tracked
    if (user.savedEvents.includes(eventId)) {
      return res
        .status(400)
        .json({ success: false, message: "Event already tracked" });
    }

    user.savedEvents.push(eventId);
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Event tracked successfully" });
  } catch (error) {
    console.error("Track Event Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// GET MY TRACKED EVENTS
const getMyTrackedEvents = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate({
      path: "savedEvents",
      select: "title category date location image",
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user.savedEvents,
    });
  } catch (error) {
    console.error("Get Tracked Events Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// UNTRACK EVENT
const untrackEvent = async (req, res) => {
  try {
    const userId = req.user._id;
    const { eventId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!user.savedEvents.includes(eventId)) {
      return res
        .status(400)
        .json({ success: false, message: "Event is not tracked" });
    }

    user.savedEvents = user.savedEvents.filter(
      (id) => id.toString() !== eventId
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Event untracked successfully",
    });
  } catch (error) {
    console.error("Untrack Event Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const userControllers = {
  userRegister,
  userLogin,
  getAllUsers,
  trackEvent,
  getMyTrackedEvents,
  untrackEvent,
};

export default userControllers;
