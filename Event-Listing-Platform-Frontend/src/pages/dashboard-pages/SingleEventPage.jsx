import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const SingleEventPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tracking, setTracking] = useState(false);

  // Fetch event details
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(
          `https://event-listing-site.vercel.app/api/v1/single-event/${id}`,
          { withCredentials: true }
        );
        setEvent(res.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  // Track event
  const handleTrack = async () => {
    try {
      setTracking(true);
      const res = await axios.post(
        `https://event-listing-site.vercel.app/api/v1/track-event/${id}`,
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
      setTracking(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading event...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        {error?.message || "Failed to load event"}
      </div>
    );
  if (!event) return <div className="text-center py-10">Event not found</div>;

  return (
    <div className="max-w-4xl mx-auto bg-base-100 p-6 rounded-lg shadow-md my-6">
      {/* Event Image */}
      <img
        src={event.image}
        alt={event.title}
        className="w-full max-h-96 object-cover rounded-lg mb-6"
      />

      {/* Event Title */}
      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>

      {/* Category Badge */}
      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full uppercase mb-4">
        {event.category}
      </span>

      {/* Event Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <p>
            <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
          </p>
          <p>
            <strong>Time:</strong> {event.time}
          </p>
        </div>
        <div>
          <p>
            <strong>Location:</strong> {event.location}
          </p>
          <p>
            <strong>Created By:</strong> {event.creator?.[0]?.name} (
            {event.creator?.[0]?.email})
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="mt-4 text-sm leading-relaxed">
        <p>{event.description}</p>
      </div>

      {/* Track Button */}
      <div className="mt-6 text-right">
        <button
          className="btn btn-primary w-full md:w-auto btn-sm md:btn-md"
          onClick={handleTrack}
          disabled={tracking}
        >
          {tracking ? "Tracking..." : "Track"}
        </button>
      </div>
    </div>
  );
};

export default SingleEventPage;
