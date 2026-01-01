import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import useAuthStore from "../lib/store/useAuthStore";

const RegisterUserPage = () => {
  const navigate = useNavigate();
  const { register: registerUser, loading } = useAuthStore();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const success = await registerUser(data);
      if (success) {
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        toast.error("Registration failed");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-500 mt-1">
            Join our platform to manage and track your events
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Full Name"
            className="input input-bordered w-full focus:ring-2 focus:ring-indigo-300"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          {/* Email */}
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Email Address"
            className="input input-bordered w-full focus:ring-2 focus:ring-indigo-300"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Password */}
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Password"
            className="input input-bordered w-full focus:ring-2 focus:ring-indigo-300"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-neutral mt-4 w-full"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Register"
            )}
          </button>
        </form>

        {/* Already have account */}
        <p className="text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-black hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterUserPage;
