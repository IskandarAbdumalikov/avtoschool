import React, { memo, useEffect } from "react";
import AdminHeader from "../../components/adminHeader/AdminHeader";
import Sidebar from "../../components/sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import "./admin.scss";
import { useSelector } from "react-redux";

const Admin = () => {
  // let navigate = useNavigate();
  
  return (
    <div className="admin">
      <Sidebar />
      <div className="admin__content">
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
};

export default memo(Admin);
