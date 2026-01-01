import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Trash2,
  CalendarDays,
  MapPin,
  Eye,
  Pencil,
  CircleX,
} from "lucide-react";
import toast from "react-hot-toast";

const DashboardPage = () => {
  const [savedEvents, setSavedEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const token = localStorage.getItem("user-token");

  // Fetch tracked events
  useEffect(() => {
    const fetchSavedEvents = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/my-tracked-events",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSavedEvents(res.data.data);
      } catch (err) {
        setError(err);
      }
    };

    const fetchMyEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/my-events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data.data);
        setMyEvents(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedEvents();
    fetchMyEvents();
  }, [token]);

  // Untrack event
  const handleUntrack = async (eventId) => {
    if (!confirm("Untrack this event?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/v1/untrack-event/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSavedEvents((prev) => prev.filter((e) => e._id !== eventId));
      toast.success("Event untracked");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to untrack event");
    }
  };

  // Delete own event
  const handleDeleteMyEvent = async (eventId) => {
    if (!confirm("Delete this event?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/v1/delete-event/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMyEvents((prev) => prev.filter((e) => e._id !== eventId));

      setSavedEvents((prev) => prev.filter((e) => e._id !== eventId));

      toast.success("Event deleted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete event");
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Greeting */}
      <div>
        <h1 className="text-3xl font-bold">
          Welcome{user?.name ? `, ${user.name}` : ""} 👋
        </h1>
        <p className="opacity-70 mt-1">Here’s an overview of your activity</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-lg p-6">
          <h2 className="text-sm uppercase opacity-60">Tracked Events</h2>
          <p className="text-4xl font-bold mt-2">{savedEvents.length}</p>
        </div>

        <div className="card bg-base-100 shadow-lg p-6">
          <h2 className="text-sm uppercase opacity-60">Your Events</h2>
          <p className="text-4xl font-bold mt-2">{myEvents.length}</p>
        </div>
      </div>

      <div className="card bg-base-100 shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Your Tracked Events</h2>

        {loading ? (
          <p>Loading events...</p>
        ) : savedEvents.length === 0 ? (
          <p className="opacity-60">You haven’t tracked any events yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {savedEvents.map((event) => (
                  <tr key={event._id}>
                    <td>
                      <p className="font-semibold">{event.title}</p>
                      <p className="text-xs opacity-60 uppercase">
                        {event.category}
                      </p>
                    </td>
                    <td>
                      <div className="flex gap-1 items-center">
                        <CalendarDays size={14} />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-1 items-center">
                        <MapPin size={14} /> {event.location}
                      </div>
                    </td>
                    <td className="text-right">
                      <button
                        className="btn btn-outline btn-primary btn-sm mr-2"
                        onClick={() =>
                          navigate(`/dashboard/single-event/${event._id}`)
                        }
                      >
                        <Eye size={14} /> View
                      </button>
                      <button
                        className="btn btn-outline btn-error btn-sm"
                        onClick={() => handleUntrack(event._id)}
                      >
                        <CircleX size={14} /> Untrack
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="card bg-base-100 shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Your Created Events</h2>

        {myEvents.length === 0 ? (
          <p className="opacity-60">You haven’t created any events yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myEvents.map((event) => (
                  <tr key={event._id}>
                    <td>
                      <p className="font-semibold">{event.title}</p>
                      <p className="text-xs opacity-60 uppercase">
                        {event.category}
                      </p>
                    </td>
                    <td>
                      <div className="flex gap-1 items-center">
                        <CalendarDays size={14} />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-1 items-center">
                        <MapPin size={14} />
                        {event.location}
                      </div>
                    </td>
                    <td className="text-right">
                      <div className="flex flex-col md:flex-row gap-1 justify-end items-center">
                        <button
                          className="btn btn-outline btn-primary btn-sm"
                          onClick={() =>
                            navigate(`/dashboard/single-event/${event._id}`)
                          }
                        >
                          <Eye size={14} /> View
                        </button>
                        <button
                          className="btn btn-outline btn-warning btn-sm"
                          onClick={() =>
                            navigate(`/dashboard/update-event/${event._id}`)
                          }
                        >
                          <Pencil size={14} /> Update
                        </button>
                        <button
                          className="btn btn-outline btn-error btn-sm"
                          onClick={() => handleDeleteMyEvent(event._id)}
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
