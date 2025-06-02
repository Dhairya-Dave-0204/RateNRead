import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../../context//AppContext"

function ProfileHeader() {

  const [userName, setUsername] = useState("");
  const { backendUrl } = useContext(AppContext);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/user/profile`, { withCredentials: true })

        if (response.data.success === false) {
          toast.error("Failed to fetch user profile. Please try again later.");
        }
        const data = await response.data;
        setUsername(data.user.username);
      } catch (error) { 
        console.error("Error fetching username:", error);
        toast.error("Failed to fetch username. Please try again later.");
      }
    }

    fetchUserName()
  }, [])
  
  return (
    <div className="mb-8">
      <h1 className="mb-2 text-3xl font-bold">
        Hello,{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-main-border to-ternary-pink">
          {userName || "User"}!
        </span>
      </h1>
      <p className="text-text-mute">
        Manage your account settings and reading
      </p>
    </div>
  );
}

export default ProfileHeader;
