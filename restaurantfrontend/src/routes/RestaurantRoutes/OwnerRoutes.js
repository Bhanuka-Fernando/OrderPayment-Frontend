// src/routes/OwnerRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../../componenets/Sidebar/Sidebar";
import Dashboard from "../../componenets/Dashboard/Dashboard";
import RestaurantDetails from "../../componenets/Restaurants/RestaurantDetails";
import AddMenuItemForm from "../../componenets/MenuItem/AddMenuItemForm";


const OwnerRoutes = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="details" element={<RestaurantDetails />} />
          <Route
  path="menu"
  element={
    <AddMenuItemForm restaurantId={localStorage.getItem("restaurantId")} />
  }
/>
        </Routes>
      </div>
    </div>
  );
};

export default OwnerRoutes;
