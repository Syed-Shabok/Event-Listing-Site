import { Outlet, useNavigate, Link } from "react-router-dom";
import useAuthStore from "../lib/store/useAuthStore";
import {
  CalendarCog,
  CalendarPlus,
  CalendarSearch,
  LayoutDashboardIcon,
} from "lucide-react";
import toast from "react-hot-toast";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const sidebarLinks = (
    <>
      <div className="flex flex-col gap-2 mt-2">
        <li>
          <Link to="/dashboard">
            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-2 items-center">
              <LayoutDashboardIcon className="y-1.5 inline-block" />
              <span className="is-drawer-close:hidden">Dashboard</span>
            </button>
          </Link>
        </li>

        <li>
          <Link to="/dashboard/event-list">
            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-2 items-center">
              <CalendarSearch className="y-1.5 inline-block" />
              <span className="is-drawer-close:hidden">Browse Events</span>
            </button>
          </Link>
        </li>

        {/* <li>
          <Link to="/dashboard/event-list">
            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-2 items-center">
              <CalendarCog className="y-1.5 inline-block" />
              <span className="is-drawer-close:hidden">Your Events</span>
            </button>
          </Link>
        </li> */}

        <li>
          <Link to="/dashboard/create-event">
            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-2 items-center">
              <CalendarPlus className="y-1.5 inline-block" />
              <span className="is-drawer-close:hidden">Create Event</span>
            </button>
          </Link>
        </li>
      </div>
    </>
  );

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <div className="flex w-full items-center gap-2">
            <div className="flex justify-center items-center">
              <label
                htmlFor="my-drawer-4"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                {/* Sidebar toggle icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-6"
                >
                  <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                  <path d="M9 4v16"></path>
                  <path d="M14 10l2 2l-2 2"></path>
                </svg>
              </label>
              <div className="px-1 font-semibold">Event Listing Platform</div>
            </div>

            <div className="flex ml-auto">
              <button
                onClick={async () => {
                  const res = await logout();
                  toast.success("Successfully logged out!");
                  navigate("/");
                }}
                className="btn btn-outline btn-error"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        {/* Page content here */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">{sidebarLinks}</ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
