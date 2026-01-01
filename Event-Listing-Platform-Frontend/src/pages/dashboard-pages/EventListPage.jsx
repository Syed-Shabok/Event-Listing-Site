import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useEventStore from "../../lib/store/useEventStore";
import toast from "react-hot-toast";

const EventListPage = () => {
  const { events = [], fetchEvents, loading, error } = useEventStore();
  const navigate = useNavigate();
  const [trackingId, setTrackingId] = useState(null);

  // Filter states
  const [searchCategory, setSearchCategory] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  // Category options
  const categoryOptions = [
    "Entertainment",
    "Conference",
    "Expo & Exhibition",
    "Workshop & Training",
    "Meetup & Networking",
    "Sports & Fitness",
    "Education",
    "Cultural & Festival",
  ];

  useEffect(() => {
    fetchEvents(10, 1); // Fetch first 10 events
  }, [fetchEvents]);

  const handleTrack = async (eventId) => {
    try {
      setTrackingId(eventId);

      const res = await axios.post(
        `https://event-listing-site.vercel.app/api/v1/track-event/${eventId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        }
      );

      toast.success(res.data.message || "Event tracked successfully");
    } catch (err) {
      if (err.response?.status === 400) {
        toast.error(err.response.data.message || "Event already tracked");
      } else {
        toast.error(err.response?.data?.message || "Failed to track event");
      }
    } finally {
      setTrackingId(null);
    }
  };

  // Filter events by category & location
  const filteredEvents = events.filter((event) => {
    return (
      (!searchCategory || event.category === searchCategory) &&
      (!searchLocation ||
        event.location.toLowerCase().includes(searchLocation.toLowerCase()))
    );
  });

  if (loading) return <div>Loading events...</div>;
  if (error) return <div>{error?.message || "Something went wrong."}</div>;

  return (
    <div>
      {/* Search Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Category Dropdown */}
        <select
          className="select select-bordered w-full md:w-1/2"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categoryOptions.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Location Input */}
        <input
          type="text"
          placeholder="Search by location"
          className="input input-bordered w-full md:w-1/2"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
      </div>

      <ul className="list bg-base-100 rounded-box shadow-md p-4 space-y-6">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Upcoming Events
        </li>

        {Array.isArray(filteredEvents) && filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <li
              key={event._id}
              className="flex flex-col md:flex-row items-start md:items-center gap-4 border-b pb-4"
            >
              {/* Event Image */}
              <div className="flex-shrink-0">
                <img
                  className="w-40 h-28 md:w-48 md:h-32 object-cover rounded-lg"
                  src={
                    event.image ||
                    "https://img.daisyui.com/images/profile/demo/2@94.webp"
                  }
                  alt={event.title}
                />
              </div>

              {/* Event Details */}
              <div className="flex-1 flex flex-col md:flex-row md:justify-between gap-2 w-full">
                <div className="flex-1">
                  <h2 className="font-bold text-lg">{event.title}</h2>
                  <p className="text-sm opacity-70 uppercase font-semibold">
                    {event.category}
                  </p>
                  <p className="mt-2 text-sm">{event.description || ""}</p>

                  <p className="text-sm mt-2">
                    <strong>Date:</strong>{" "}
                    {new Date(event.date).toLocaleDateString()} |{" "}
                    <strong>Time:</strong> {event.time}
                  </p>
                  <p className="text-sm">
                    <strong>Location:</strong> {event.location}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 items-center justify-center mt-2 md:mt-0">
                  <button
                    className="btn btn-primary btn-sm md:btn-md"
                    onClick={() =>
                      navigate(`/dashboard/single-event/${event._id}`)
                    }
                  >
                    View
                  </button>

                  <button
                    className="btn btn-outline btn-sm md:btn-md"
                    onClick={() => handleTrack(event._id)}
                    disabled={trackingId === event._id}
                  >
                    {trackingId === event._id ? "Tracking..." : "Track"}
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="text-center py-4 opacity-60">No events found</li>
        )}
      </ul>
    </div>
  );
};

export default EventListPage;
