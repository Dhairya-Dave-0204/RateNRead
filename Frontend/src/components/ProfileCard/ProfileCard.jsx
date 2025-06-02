import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

function ProfileCard() {
  const { backendUrl } = useContext(AppContext);
  const [userData, setUserData] = useState({
    name: "guest",
    email: "guest@gmail.com",
    joinDate: "1/1/1234",
  });

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);
    return `${day}-${month}-${year}`;
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const resonse = await axios.get(`${backendUrl}/api/user/profile`, {
          withCredentials: true,
        });
        if (resonse.data.success === false) {
          toast.error("Failed to fetch user profile. Please try again later.");
          return;
        }
        const data = resonse.data.user;
        console.log("User Data:", data);
        setUserData({
          name: data.username || "Guest",
          email: data.email || "No defined email",
          joinDate: formatDate(data.created_at) || "No account date",
        });
      } catch (error) {
        console.error("Error fetching userData:", error);
        toast.error("Failed to fetch userData. Please try again later.");
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="p-6 bg-white border shadow-sm rounded-2xl border-text-pri">
      <div className="text-center">
        <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 text-2xl font-bold text-white rounded-full bg-main-border">
          {userData.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <h2 className="mb-1 text-xl font-semibold ">{userData.name}</h2>
        <p className="mb-4 text-text-mute">{userData.email}</p>
        <div className="text-sm text-text-mute">
          Member since {userData.joinDate}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
