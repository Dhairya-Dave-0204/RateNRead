import { useContext } from "react";
import { AppContext } from "../../context//AppContext"

function ProfileHeader() {
  
  const { user } = useContext(AppContext);
  
  return (
    <div className="mb-8">
      <h1 className="mb-2 text-3xl font-bold">
        Hello,{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-main-border to-ternary-pink">
          {user?.username || "User"}!
        </span>
      </h1>
      <p className="text-text-mute">
        Manage your account settings and reading
      </p>
    </div>
  );
}

export default ProfileHeader;
