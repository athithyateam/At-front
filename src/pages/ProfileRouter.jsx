import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import BaseTravelProfile from "../components/profile/BaseTravelProfile";
import HostProfile from "../components/profile/HostProfile";
import GuestProfile from "../components/profile/GuestProfile";
import { getProfileByIdApi } from "../api/profileApi";
import { useAuth } from "../context/AuthContext";

export default function ProfileRouter() {
  const { userId } = useParams();
  const { user: loggedInUser } = useAuth();

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await getProfileByIdApi(userId);

        if (res.success) {
          setProfileData(res.data);
        }
      } catch (err) {
        console.error("Profile fetch error", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [userId]);

  if (loading) return <div className="p-6">Loading profile...</div>;
  if (!profileData) return <div className="p-6">Profile not found</div>;

  const { user, posts, postStats, reviewStats } = profileData;
  const isOwner = loggedInUser?._id === user._id;

  return (
    <BaseTravelProfile user={user} isOwner={isOwner}>
      {user.role === "host" ? (
        <HostProfile
          posts={posts}
          postStats={postStats}
          reviewStats={reviewStats}
        />
      ) : (
        <GuestProfile posts={posts} />
      )}
    </BaseTravelProfile>
  );
}
