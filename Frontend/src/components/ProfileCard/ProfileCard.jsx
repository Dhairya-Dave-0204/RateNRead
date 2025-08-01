import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

function ProfileCard() {
  const { user } = useContext(AppContext);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);
    return `${day}-${month}-${year}`;
  }

  const name = user?.username || "Guest";
  const email = user?.email || "No defined email";
  const joinDate = user?.created_at ? formatDate(user.created_at) : "Unknown";

  return (
    <div className="p-6 bg-white border shadow-sm rounded-2xl border-text-pri">
      <div className="text-center">
        <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 text-2xl font-bold text-white rounded-full bg-main-border">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <h2 className="mb-1 text-xl font-semibold ">{name}</h2>
        <p className="mb-4 text-text-mute">{email}</p>
        <div className="text-sm text-text-mute">Member since {joinDate}</div>
      </div>
    </div>
  );
}

export default ProfileCard;
