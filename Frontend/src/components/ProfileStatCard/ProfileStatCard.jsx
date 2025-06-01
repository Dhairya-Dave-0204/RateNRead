import { userData } from "../ProfileCard/data";

function ProfileStatCard() {
  return (
    <div
      className="rounded-2xl p-6 shadow-sm border"
      style={{
        backgroundColor: "white",
        borderColor: "#e5e5e7",
      }}
    >
      <h3 className="text-lg font-semibold mb-4" style={{ color: "#1c1c1e" }}>
        Reading Stats
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span style={{ color: "#a1a1a3" }}>Books Read</span>
          <span className="font-semibold" style={{ color: "#4a6cf7" }}>
            {userData.booksRead}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span style={{ color: "#a1a1a3" }}>Current Streak</span>
          <span className="font-semibold" style={{ color: "#4caf50" }}>
            {userData.currentStreak} days
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span style={{ color: "#a1a1a3" }}>Total Pages</span>
          <span className="font-semibold" style={{ color: "#1c1c1e" }}>
            {userData.totalPages.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProfileStatCard;
