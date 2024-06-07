import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import path from "ultils/path";
import { useSelector } from "react-redux";
import { AdminSidebar } from "components";

const AdminLayout = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  if (!isLoggedIn || !current || +current.role !== 1945)
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;

  return (
    <div className="flex flex-col md:flex-row">
      <AdminSidebar />

      <div className="flex-grow bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};
export default AdminLayout;
