// get user infos by id
import { useState, useEffect } from 'react';
import { getBackend } from '@/services/backend';

export const useProfileUserById = (userId: string) => {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
	const fetchProfile = async () => {
	  try {
		const backend = getBackend();
		const userProfile = await backend.getUserProfile(userId);
		setProfile(userProfile);
	  } catch (err) {
		setError('Erreur lors de la récupération du profil');
		console.error('Error fetching profile:', err);
	  } finally {
		setLoading(false);
	  }
	};

	fetchProfile();
  }, [userId]);

  return { profile, loading, error };
};