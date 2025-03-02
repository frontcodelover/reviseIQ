import { appContainer } from '@/infrastructure/config/AppContainer';
import { useState, useCallback } from 'react';

interface UseAvatarUploadDebugProps {
  userId: string;
  onChange: (avatarUrl: string | null) => void;
}

export const useAvatarUploadDebug = ({ userId, onChange }: UseAvatarUploadDebugProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadAvatar = useCallback(
    async (file: File | null) => {
      if (!file) {
        onChange(null);
        return;
      }

      setUploading(true);
      setError(null);

      try {
        const avatarUrl = await appContainer.getAvatarService().uploadAvatar(userId, file);
        onChange(avatarUrl);
      } catch (e: unknown) {
        console.error('Error uploading avatar:', e);
        setError(`Error: ${(e as Error).message}`);
        onChange(null);
      } finally {
        setUploading(false);
      }
    },
    [userId, onChange]
  );

  const clearAvatar = useCallback(() => {
    onChange(null);
    setError(null);
  }, [onChange]);

  return {
    uploading,
    error,
    uploadAvatar,
    clearAvatar,
  };
};
