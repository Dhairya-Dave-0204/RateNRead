import React from "react";
import { userData } from "./data";

function ProfileCard() {
  return (
    <div className="rounded-2xl p-6 shadow-sm border bg-white border-text-pri">
      <div className="text-center">
        <div
          className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold"
          style={{ backgroundColor: "#4a6cf7" }}
        >
          {userData.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <h2 className="text-xl font-semibold mb-1" style={{ color: "#1c1c1e" }}>
          {userData.name}
        </h2>
        <p style={{ color: "#a1a1a3" }} className="mb-4">
          {userData.email}
        </p>
        <div className="text-sm" style={{ color: "#a1a1a3" }}>
          Member since {userData.joinDate}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
