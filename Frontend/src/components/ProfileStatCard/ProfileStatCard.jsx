import { userData } from "../ProfileCard/data";

function ProfileStatCard() {
  return (
    <div className="rounded-2xl p-6 shadow-sm border bg-white border-text-pri">
      <h3 className="text-lg font-semibold mb-4">Reading Stats</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-text-mute">Books Read</span>
          <span className="font-semibold text-main-border">
            {userData.booksRead}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-text-mute">Current Streak</span>
          <span className="font-semibold text-accent-green">
            {userData.currentStreak} days
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-text-mute">Total Pages</span>
          <span className="font-semibold">
            {userData.totalPages.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProfileStatCard;
