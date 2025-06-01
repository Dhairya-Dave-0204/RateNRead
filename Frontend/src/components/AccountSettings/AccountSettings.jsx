import { userData } from "../ProfileCard/data";

function AccountSettings() {
  return (
    <div
      className="rounded-2xl p-6 shadow-sm border"
      style={{
        backgroundColor: "white",
        borderColor: "#e5e5e7",
      }}
    >
      <h3 className="text-xl font-semibold mb-6" style={{ color: "#1c1c1e" }}>
        Account Settings
      </h3>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#1c1c1e" }}
            >
              Full Name
            </label>
            <input
              type="text"
              value={userData.name}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              style={{
                borderColor: "#e5e5e7",
                focusRingColor: "#4a6cf7",
              }}
              readOnly
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#1c1c1e" }}
            >
              Email Address
            </label>
            <input
              type="email"
              value={userData.email}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              style={{
                borderColor: "#e5e5e7",
                focusRingColor: "#4a6cf7",
              }}
              readOnly
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="px-6 py-3 rounded-lg font-medium text-white transition-colors"
            style={{ backgroundColor: "#4a6cf7" }}
          >
            Update Profile
          </button>
          <button
            className="px-6 py-3 rounded-lg font-medium border transition-colors"
            style={{
              borderColor: "#e5e5e7",
              color: "#1c1c1e",
            }}
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
