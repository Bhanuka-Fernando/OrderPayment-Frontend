import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/g_AddRestaurantForm.css";

function RestaurantLogin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/restaurants/login",
        {
          name,
          password,
        }
      );

       // Clear existing garbage values first
    localStorage.removeItem("restaurantId");
      console.log("Login response:", response.data); // Log the entire response

      // After successful login response
      console.log(response.data.id);
       
    // Set fresh values
    localStorage.setItem("restaurantId", response.data.id.toString()); // Force string
    localStorage.setItem("restaurantName", response.data.name);

      //if (response.data.status === "pending") {
      // setErrorMessage(
      //   "Your request is still pending. Please wait for admin approval."
      //  );
      //  } else if (response.data.status === "approved") {
      // Successful login
       // Ensure data is stored before navigating
       await new Promise(resolve => setTimeout(resolve, 0));
    
       navigate("/owner/dashboard");
     } catch (error) {
       setErrorMessage("Invalid credentials or something went wrong.");
     }
   };

  return (
    <div className="form-container">
      <h2>Restaurant Login</h2>
      <div className="form-group">
        <label>Restaurant Name</label>
        <input
          type="text"
          placeholder="Restaurant Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={handleLogin}>Login</button>

      {errorMessage && <p className="error">{errorMessage}</p>}

      <button
        className="submit-btn"
        style={{ marginTop: "16px", background: "#6c63ff" }}
        onClick={() => navigate("/createrestaurant")}
      >
        Don't you register the restaurant? Register restaurant
      </button>
    </div>
  );
}

export default RestaurantLogin;
