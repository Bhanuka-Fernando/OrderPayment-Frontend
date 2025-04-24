import React from "react";
import MenuItemTable from "../MenuItem/MenuItemTable";
import '../../styles/g_Dashboard.css';

const Dashboard = () => {
  const restaurantId = localStorage.getItem("restaurantId");

  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Welcome to my Dashboard</h1>
      <p className="dashboard-description">
        Here you can manage your menu, orders, and restaurant details with ease.
      </p>
      <MenuItemTable restaurantId={restaurantId} />
    </div>
  );
};

export default Dashboard;