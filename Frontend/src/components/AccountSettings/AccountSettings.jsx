import { userData } from "../ProfileCard/data";

function AccountSettings() {
  return (
    <div className="rounded-2xl p-6 shadow-sm border bg-white border-text-pri">
      <h3 className="text-xl font-semibold mb-6">Account Settings</h3>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={userData.name}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 border-text-pri focus:ring-main-border"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={userData.email}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 border-text-pri focus:ring-main-border"
              readOnly
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-6 py-3 rounded-lg font-medium cursor-pointer text-white transition-colors bg-main-border hover:bg-main-border/85 duration-300">
            Update Profile
          </button>
          <button className="px-6 py-3 rounded-lg font-medium border cursor-pointer transition-colors border-text-pri hover:bg-gray-200 duration-300">
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
