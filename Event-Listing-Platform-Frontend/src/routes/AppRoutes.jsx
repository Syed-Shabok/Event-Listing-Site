import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/dashboard-pages/DashboardPage";
import { PrivateRoute } from "./PrivateRoute";
import EventListPage from "../pages/dashboard-pages/EventListPage";
import SingleEventPage from "../pages/dashboard-pages/SingleEventPage";
import CreateEventPage from "../pages/dashboard-pages/CreateEventPage";
import UpdateEventPage from "../pages/dashboard-pages/UpdateEventPage";
import RegisterUserPage from "../pages/RegisterUserPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Login page */}
      <Route path="/login" element={<LoginPage />} />
      {/* Optionally redirect "/" to login */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterUserPage />} />

      {/* Dashboard Layout (protected routes) */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="create-event" element={<CreateEventPage />} />
          <Route path="update-event/:id" element={<UpdateEventPage />} />
          <Route path="event-list" element={<EventListPage />} />
          <Route path="single-event/:id" element={<SingleEventPage />} />
        </Route>
      </Route>

      {/* Catch all unmatched paths */}
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRoutes;
