import React from "react";
import { userData } from "./data";

function ProfileCard() {
  return (
    <div className="rounded-2xl p-6 shadow-sm border bg-white border-text-pri">
      <div className="text-center">
        <div
          className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center bg-main-border text-white text-2xl font-bold"
        >
          {userData.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <h2 className="text-xl font-semibold mb-1 ">
          {userData.name}
        </h2>
        <p className="mb-4 text-text-mute">
          {userData.email}
        </p>
        <div className="text-sm text-text-mute">
          Member since {userData.joinDate}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
