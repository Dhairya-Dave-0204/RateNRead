import {
  ProfileHeader,
  ProfileCard,
  ProfileStatCard,
  AccountSettings,
  RecentBooks,
} from "../../components/component_index";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

function Profile() {
  const { user, loading } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user === false) {
      navigate("/login");
    }
  }, [user]);

  if (loading) return <p>Loading profile...</p>;
  if (!user) return null;

  return (
    <div className="px-4 py-8 mx-auto max-md:mt-10 sm:px-6 lg:px-8">
      <ProfileHeader />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column - Profile & Stats */}
        <div className="space-y-6 lg:col-span-1">
          <ProfileCard />
          <ProfileStatCard />
        </div>

        {/* Right Column - Settings & Library */}
        <div className="space-y-6 lg:col-span-2">
          <AccountSettings />
          <RecentBooks />
        </div>
      </div>
    </div>
  );
}

export default Profile;
