import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PrivateRoute } from "../routes/PrivateRoute";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../lib/store/useAuthStore";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    //console.log(data);
    try {
      const res = await login(data);
      if (res) {
        toast.success("Login Successful.");
        navigate("/dashboard");
      } else {
        toast.error("Login Failed.");
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col gap-6 text-center">
          <div>
            <h1 className="text-4xl font-bold">Event Listing Platform</h1>
            <p className="mt-2 text-base-content/70">
              Discover, manage, and attend amazing events
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card bg-base-100 w-full max-w-sm shadow-2xl"
          >
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />

                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />

                <div className="mt-1">
                  <Link to="/signup" className="link link-hover">
                    Create an account
                  </Link>
                </div>

                <button type="submit" className="btn btn-neutral mt-4">
                  Login
                </button>
              </fieldset>
            </div>
          </form>

          <PrivateRoute />
        </div>
      </div>
    </>
  );
};
export default LoginPage;
