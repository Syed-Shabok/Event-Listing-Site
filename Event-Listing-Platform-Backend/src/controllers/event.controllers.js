import mongoose from "mongoose";
import Event from "../models/event.model.js";

//! Create Event (Only logged-in users)
const createEvent = async (req, res) => {
  try {
    const { data } = req.body;
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const eventData = JSON.parse(data);
    const { title, category, date, time, location, description } = eventData;
    const image = req.file?.path;

    if (!title || !category || !date || !time || !location || !description) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const createdEvent = await Event.create({
      title,
      category,
      date,
      time,
      location,
      description,
      image,
      createdBy: req.user._id,
    });

    res.status(200).json({
      success: true,
      message: "Event created successfully",
      data: createdEvent,
    });
  } catch (error) {
    console.error("Create Event Error:", error);
    res.status(500).json({
      success: false,
      error: error.toString(),
      message: "Something went wrong.",
    });
  }
};

//! Get All Events (Pagination + Filter)
const allEvents = async (req, res) => {
  try {
    const pageNo = Number(req.params.pageNo) || 1;
    const perPage = Number(req.params.perPage) || 10;
    const skipRow = (pageNo - 1) * perPage;

    const matchStage = {};

    // optional filters
    if (req.query.category) matchStage.category = req.query.category;
    if (req.query.location) matchStage.location = req.query.location;

    // Fetch total count separately for simplicity
    const totalCount = await Event.countDocuments(matchStage);

    // Fetch events with correct sort and pagination
    const events = await Event.find(matchStage)
      .sort({ date: 1 }) // upcoming events first
      .skip(skipRow)
      .limit(perPage)
      .select("title image category date time location description createdAt");

    res.status(200).json({
      success: true,
      message: "Events fetched successfully",
      data: {
        totalCount: [{ count: totalCount }],
        events,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.toString(),
      message: "Something went wrong.",
    });
  }
};

//! Get Single Event
const singleEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Event.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "creator",
        },
      },
      {
        $project: {
          title: 1,
          image: 1,
          category: 1,
          date: 1,
          time: 1,
          location: 1,
          description: 1,
          createdAt: 1,
          creator: {
            _id: 1,
            name: 1,
            email: 1,
          },
        },
      },
    ]);

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event fetched successfully",
      data: data[0],
    });
  } catch (error) {
    console.error("Single Event Error:", error);
    res.status(500).json({
      success: false,
      error: error.toString(),
      message: "Something went wrong.",
    });
  }
};

//! Update Event
const updateEvent = async (req, res) => {
  try {
    const { data } = req.body;
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const eventData = JSON.parse(data);
    const { title, category, date, time, location, description } = eventData;

    const updateData = { title, category, date, time, location, description };
    if (req.file?.path) updateData.image = req.file.path;

    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found or unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: event,
    });
  } catch (error) {
    console.error("Update Event Error:", error);
    res.status(500).json({
      success: false,
      error: error.toString(),
      message: "Something went wrong.",
    });
  }
};

//! Delete Event (Only owner)
const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found or unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
      data: deletedEvent,
    });
  } catch (error) {
    console.error("Delete Event Error:", error);
    res.status(500).json({
      success: false,
      error: error.toString(),
      message: "Something went wrong.",
    });
  }
};

// Gets Events Created bY a specific user
const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch your events",
    });
  }
};

const eventControllers = {
  createEvent,
  allEvents,
  singleEvent,
  updateEvent,
  deleteEvent,
  getMyEvents,
};

export default eventControllers;
