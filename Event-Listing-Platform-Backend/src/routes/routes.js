import express from "express";
import upload from "../config/multer.config.js";
import userControllers from "../controllers/user.controller.js";
import eventControllers from "../controllers/event.controllers.js";
import { validateUser } from "../middlewares/validation.middlewares.js";

const router = express.Router();

//! User Auth
router.post("/register", userControllers.userRegister);
router.post("/login", userControllers.userLogin);
router.post("/logout", (req, res) => {
  try {
    res.clearCookie("user-token");
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: "Logout failed",
    });
  }
});
// Get All Users
router.get("/all-users", validateUser, userControllers.getAllUsers);

// Get Logged-in User's Tracked Events
router.get(
  "/my-tracked-events",
  validateUser,
  userControllers.getMyTrackedEvents
);
router.delete(
  "/untrack-event/:eventId",
  validateUser,
  userControllers.untrackEvent
);

//! Events

// Create Event (Protected)
router.post(
  "/create-event",
  validateUser,
  upload.single("image"),
  eventControllers.createEvent
);

// Get All Events
router.get("/all-events/:pageNo/:perPage", eventControllers.allEvents);

// Get Logged-in User's Created Events
router.get("/my-events", validateUser, eventControllers.getMyEvents);

// Get Single Event
router.get("/single-event/:id", eventControllers.singleEvent);

// Update Event
router.put(
  "/update-event/:id",
  validateUser,
  upload.single("image"),
  eventControllers.updateEvent
);

// Delete Event
router.delete("/delete-event/:id", validateUser, eventControllers.deleteEvent);

// Track Event
router.post("/track-event/:eventId", validateUser, userControllers.trackEvent);

export default router;
