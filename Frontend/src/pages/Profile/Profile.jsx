import {
  ProfileHeader,
  ProfileCard,
  ProfileStatCard,
  AccountSettings,
  RecentBooks,
  AnimatedLoader
} from "../../components/component_index";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useState } from "react";

function Profile() {
  const { user, loading } = useContext(AppContext);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user === false) {
      navigate("/login");
    }

    if (!loading && user === true) {
      const timer = setTimeout(() => {
        setShowProfile(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [user, loading]);

  if (loading || (!showProfile && user)) {
    return <AnimatedLoader />;
  }

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
