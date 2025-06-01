import { ProfileHeader, ProfileCard, ProfileStatCard, AccountSettings, RecentBooks } from "../../components/component_index"

function Profile() {

  return (

      <div className="mx-auto px-4 max-md:mt-10 sm:px-6 lg:px-8 py-8">
        <ProfileHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile & Stats */}
          <div className="lg:col-span-1 space-y-6">
            <ProfileCard />
            <ProfileStatCard />
          </div>

          {/* Right Column - Settings & Library */}
          <div className="lg:col-span-2 space-y-6">
            <AccountSettings />
            <RecentBooks />
          </div>
        </div>
      </div>
  );
}

export default Profile