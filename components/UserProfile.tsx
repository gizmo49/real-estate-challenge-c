import { useState, useEffect, useCallback } from 'react';
import { auth } from '../lib/firebase';
import { getUserProfile, updateUserProfile } from '../utils/api';
import FullPageError from './common/FullPageError';
import { UserProfile as UserProfileType } from '../types';

const UserProfile = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [favoriteProperties, setFavoriteProperties] = useState<string[]>([]);

  const fetchUserProfile = useCallback(async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);
        const profileData = await getUserProfile(currentUser.uid);
        setProfile(profileData);
        setFavoriteProperties(profileData.favoriteProperties || []);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const handleSaveFavorites = async () => {
    if (!user || !profile) return;
    
    try {
      await updateUserProfile(user.uid, { favoriteProperties });
      alert('Favorites updated successfully');
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <FullPageError message={error} onRetry={fetchUserProfile} />;
  }

  return (
    <div>
      <h1>{user?.email}'s Profile</h1>
      <h2>Favorite Properties</h2>
      <ul>
        {favoriteProperties.map((propertyId) => (
          <li key={propertyId}>{propertyId}</li>
        ))}
      </ul>
      <button onClick={handleSaveFavorites} className="bg-blue-500 text-white p-2">
        Save Favorites
      </button>
    </div>
  );
};

export default UserProfile;
