import { create } from "zustand";
import {
  createEventApi,
  updateEventApi,
  deleteEventApi,
  fetchEventsApi,
  fetchSingleEventApi,
} from "../api/eventApi";

const useEventStore = create((set) => ({
  events: [],
  singleEvent: null,
  loading: false,
  error: null,

  // Create Event
  createEvent: async (formData) => {
    try {
      set({ loading: true, error: null });
      const res = await createEventApi(formData);

      set({ loading: false });
      return res.data;
    } catch (error) {
      set({
        loading: false,
        error: error?.response?.data?.message || "Event creation failed.",
      });
      return null;
    }
  },

  // Fetch Events
  fetchEvents: async (perPage, pageNo) => {
    try {
      set({ loading: true, error: null });

      const response = await fetchEventsApi(perPage, pageNo);
      const events = response.data?.data?.events || [];

      set({
        events,
        loading: false,
      });
    } catch (error) {
      set({ loading: false, error });
    }
  },

  // Update Event
  updateEvent: async (eventId, formData) => {
    try {
      set({ loading: true, error: null });
      const res = await updateEventApi(eventId, formData);
      set({ loading: false });
      return res.data;
    } catch (error) {
      set({
        loading: false,
        error: error?.response?.data?.message || "Failed to update event",
      });
      return {
        success: false,
        message: error?.response?.data?.message || "Failed to update event",
      };
    }
  },

  // Delete Event
  deleteEvent: async (eventId) => {
    try {
      const response = await deleteEventApi(eventId);

      if (response?.data?.success) {
        const refreshed = await fetchEventsApi(10, 1);
        set({
          events: refreshed.data?.data?.events || [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  // Fetch Single Event
  fetchSingleEvent: async (eventId) => {
    try {
      const res = await fetchSingleEventApi(eventId);
      set({ singleEvent: res.data.data });
      return res.data;
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error?.response?.data?.message || "Failed to fetch event",
      };
    }
  },
}));

export default useEventStore;
