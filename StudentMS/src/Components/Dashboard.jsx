import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { DashboardOutlined, TeamOutlined, UserOutlined, DownloadOutlined, PoweroffOutlined } from "@ant-design/icons";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout')
      .then(result => {
        if (result.data.Status) { 
          localStorage.removeItem("valid");
          navigate('/');
        }
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  return (
    <div className="container-fluid vh-100 bg-light">
      <div className="row no-gutters">
        {/* Sidebar */}
        <div className="col-auto col-md-3 col-xl-2 px-0 bg-primary text-white">
          <div className="d-flex flex-column p-4 min-vh-100">
            <Link to="/dashboard" className="navbar-brand text-white mb-4">
              <span className="fw-bold fs-3">NITT</span>
            </Link>
            <ul className="nav flex-column">
              <SidebarItem icon={<DashboardOutlined />} to="/dashboard/category" text="Subjects" />
              <SidebarItem icon={<TeamOutlined />} to="/dashboard/employee" text="Manage Students" />
              <SidebarItem icon={<UserOutlined />} to="/dashboard/attendance" text="Mark Attendance" />
              <SidebarItem icon={<DownloadOutlined />} to="/dashboard/downloadattendance" text="Download Attendance" />
            </ul>
            <button className="btn btn-outline-light mt-auto" onClick={handleLogout}>
              <PoweroffOutlined className="me-2" /> Logout
            </button>
          </div>
        </div>
        {/* Content */}
        <div className="col p-0">
          <div className="p-3 d-flex justify-content-center align-items-center shadow bg-white">
            <h1 className="m-0 fs-3 text-primary">STUDENT MANAGEMENT SYSTEM</h1>
          </div>
          <div className="p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, to, text }) => {
  return (
    <li className="nav-item mb-3">
      <Link to={to} className="nav-link text-white">
        {icon} <span className="ms-2">{text}</span>
      </Link>
    </li>
  );
};

export default Dashboard;
