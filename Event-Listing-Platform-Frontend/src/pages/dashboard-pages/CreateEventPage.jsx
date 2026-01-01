import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useEventStore from "../../lib/store/useEventStore";

const CreateEventPage = () => {
  const navigate = useNavigate();
  const { createEvent, loading } = useEventStore();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

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

  const onSubmit = async (data) => {
    try {
      const { image, ...restData } = data;

      const formData = new FormData();
      formData.append("data", JSON.stringify(restData));
      formData.append("image", image[0]);

      const res = await createEvent(formData);

      if (res?.success) {
        toast.success(res.message || "Event created successfully");
        reset();
        navigate("/dashboard/event-list");
      } else {
        toast.error(res?.message || "Failed to create event");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="px-7 py-6 flex flex-col gap-4 bg-base-100 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-3xl text-center font-semibold text-primary">
          Create Event
        </h1>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <input
            {...register("title", { required: "Title is required." })}
            placeholder="Event Title"
            className="input input-bordered w-full"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}

          {/* Category */}
          <select
            {...register("category", { required: "Category is required." })}
            className="select select-bordered w-full"
          >
            <option value="">Select Category</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}

          {/* Date & Time */}
          <div className="flex gap-3">
            <input
              type="date"
              {...register("date", { required: "Date is required." })}
              className="input input-bordered w-full"
            />
            <input
              type="time"
              {...register("time", { required: "Time is required." })}
              className="input input-bordered w-full"
            />
          </div>
          {(errors.date || errors.time) && (
            <p className="text-red-500 text-sm">Date and time are required</p>
          )}

          {/* Location */}
          <input
            {...register("location", { required: "Location is required." })}
            placeholder="Event Location"
            className="input input-bordered w-full"
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}

          {/* Description */}
          <textarea
            {...register("description", {
              required: "Description is required.",
            })}
            placeholder="Event Description"
            className="textarea textarea-bordered w-full"
            rows={5}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}

          {/* Image */}
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Event image is required." })}
            className="file-input file-input-primary w-full"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary mt-4"
          >
            {loading ? (
              <span className="loading loading-bars loading-md"></span>
            ) : (
              "Create Event"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEventPage;
