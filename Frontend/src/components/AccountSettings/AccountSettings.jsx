import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify"; 
import { AppContext } from "../../context/AppContext";

function AccountSettings() {
  const { backendUrl, user } = useContext(AppContext); // ✅ Access user from context
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.username || "Guest User",
    email: user?.email || "No Email",
  });

  // ✅ Sync formData with updated user from context
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.username || "Guest User",
        email: user.email || "No Email",
      });
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateClick = async () => {
    if (isEditing) {
      try {
        const response = await axios.put(
          `${backendUrl}/api/user/profile`,
          {
            username: formData.name,
            email: formData.email,
          },
          { withCredentials: true }
        );

        if (response.data.success === false) {
          toast.error("Failed to update user data.");
          console.log(response.data.message);
          return;
        }

        toast.success("User data updated successfully.");
        setIsEditing(false);
        // Optional: trigger a context refresh if needed
      } catch (error) {
        console.error("Error updating user data:", error);
        toast.error("Failed to update user data.");
      }
    } else {
      setIsEditing(true);
    }
  };

  return (
     <div className="p-6 bg-white border shadow-sm rounded-2xl border-text-pri">
      <h3 className="mb-6 text-xl font-semibold">Account Settings</h3>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 border-text-pri focus:ring-main-border"
              readOnly={!isEditing}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 border-text-pri focus:ring-main-border"
              readOnly={!isEditing}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            onClick={handleUpdateClick}
            className="px-6 py-3 font-medium text-white transition-colors duration-300 rounded-lg cursor-pointer bg-main-border hover:bg-main-border/85"
          >
            {isEditing ? "Save Changes" : "Update Profile"}
          </button>
          <button className="px-6 py-3 font-medium transition-colors duration-300 border rounded-lg cursor-pointer border-text-pri hover:bg-gray-200">
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
