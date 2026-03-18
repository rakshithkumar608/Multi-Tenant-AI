import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6 bg-gray-50 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}