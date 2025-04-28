import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/g_RestaurantDetails.css";


const isRestaurantOpen = (openingTime, closingTime) => {
  if (!openingTime || !closingTime) return false; // return false if undefined

  const now = new Date();
  const [openHour, openMin] = openingTime.split(":").map(Number);
  const [closeHour, closeMin] = closingTime.split(":").map(Number);

  const open = new Date();
  open.setHours(openHour, openMin, 0);

  const close = new Date();
  close.setHours(closeHour, closeMin, 0);

  return now >= open && now <= close;
};



const RestaurantDetails = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const restaurantId = localStorage.getItem("restaurantId");

  useEffect(() => {
    axios.get(`http://localhost:8081/api/restaurants/${restaurantId}`)
      .then(res => {
        setRestaurant(res.data);
        setFormData(res.data);
      })
      .catch(err => console.error(err));
  }, [restaurantId]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8081/api/restaurants/${restaurantId}`, formData);
      alert("Profile updated successfully");
      setEditMode(false);
      setRestaurant(formData);
    } catch (error) {
      alert("Update failed");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      try {
        await axios.delete(`http://localhost:8081/api/restaurants/${restaurantId}`);
        alert("Profile deleted successfully");
        localStorage.removeItem("restaurantId");
        window.location.href = "/owner/dashboard";
      } catch (error) {
        alert("Delete failed");
        console.error(error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  if (!restaurant) return <p>Loading...</p>;

 
  const openStatus = restaurant?.openingTime && restaurant?.closingTime
  ? isRestaurantOpen(
      restaurant.openingTime,
      restaurant.closingTime
    )
  : false;


  



  return (
    <div className="restaurant-profile">
      <h2>Restaurant Profile</h2>
      {editMode ? (
        <>
          <input name="name" value={formData.name} onChange={handleChange} />
          <input name="email" value={formData.email} onChange={handleChange} />
          <input name="phone" value={formData.phone} onChange={handleChange} />
          <input name="address" value={formData.address} onChange={handleChange} />
          <input name="ownerName" value={formData.ownerName} onChange={handleChange} />
          <label>Opening Time</label>
    <input
      type="time"
      name="openingTime"
      value={formData.openingTime || ""}
      onChange={handleChange}
    />

    <label>Closing Time</label>
    <input
      type="time"
      name="closingTime"
      value={formData.closingTime || ""}
      onChange={handleChange}
    />

          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </>
      ) : (
        <>
          <p><strong>Name:</strong> {restaurant.name}</p>
          <p><strong>Email:</strong> {restaurant.email}</p>
          <p><strong>Phone:</strong> {restaurant.phone}</p>
          <p><strong>Address:</strong> {restaurant.address}</p>
          <p><strong>Owner:</strong> {restaurant.ownerName}</p>
          <p><strong>Opening Time:</strong> {restaurant.openingTime}</p>
<p><strong>Closing Time:</strong> {restaurant.closingTime}</p>

          <p>
  <strong>Status:</strong>{" "}
  <span style={{ color: openStatus ? "green" : "red" }}>
    {openStatus ? "Open Now" : "Closed Now"}
  </span>
</p>

          <button onClick={() => setEditMode(true)}>Edit</button>
          <button onClick={handleDelete} style={{ backgroundColor: "red", color: "white" }}>Delete</button>
        </>
      )}
    </div>
  );
};

export default RestaurantDetails;
