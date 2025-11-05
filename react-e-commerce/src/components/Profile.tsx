import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "./../app/store";
import { getUserProfile, updateUserProfile, deleteUserProfile } from "../firebase/userService";

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (user?.uid) {
      getUserProfile(user.uid).then(setProfile);
    }
  }, [user]);

  const handleUpdate = async () => {
    if (user?.uid && profile) {
      await updateUserProfile(user.uid, profile);
      alert("Profile updated successfully!");
    }
  };

  const handleDelete = async () => {
    if (user?.uid) {
      await deleteUserProfile(user.uid);
      alert("Account deleted.");
    }
  };

  if (!user) return <p>Please log in to view your profile.</p>;

  return (
    <div>
      <h2>Profile</h2>
      <input
        value={profile?.name || ""}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        placeholder="Name"
      />
      <input
        value={profile?.address || ""}
        onChange={(e) => setProfile({ ...profile, address: e.target.value })}
        placeholder="Address"
      />
      <button onClick={handleUpdate}>Save Changes</button>
      <button onClick={handleDelete}>Delete Account</button>
    </div>
  );
};

export default Profile;