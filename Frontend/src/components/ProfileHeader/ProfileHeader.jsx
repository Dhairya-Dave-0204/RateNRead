import React from "react";

function ProfileHeader() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">
        Hello,{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-main-border to-ternary-pink">
          User test!
        </span>
      </h1>
      <p className="text-text-mute">
        Manage your account settings and reading
      </p>
    </div>
  );
}

export default ProfileHeader;
