import axiosInstance from "../axiosInstance";

// Fetch all events
export const fetchEventsApi = async (perPage, pageNo) =>
  axiosInstance.get(`/all-events/${pageNo}/${perPage}`);

// Fetch single event
export const fetchSingleEventApi = async (eventId) =>
  axiosInstance.get(`/single-event/${eventId}`);

// Create event
export const createEventApi = async (formData) =>
  axiosInstance.post("/create-event", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Update event
export const updateEventApi = async (eventId, formData) =>
  axiosInstance.put(`/update-event/${eventId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Delete event
export const deleteEventApi = async (eventId) =>
  axiosInstance.delete(`/delete-event/${eventId}`);
