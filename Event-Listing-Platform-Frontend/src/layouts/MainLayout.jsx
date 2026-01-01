import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="flex flex-col gap-5 max-w-6xl mx-auto min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
};
export default MainLayout;
