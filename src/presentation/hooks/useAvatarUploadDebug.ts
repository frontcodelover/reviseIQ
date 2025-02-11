import { useState, useCallback, useMemo } from 'react';
import { UploadAvatar } from '@/application/useCases/user/UploadAvatar.usecase';
import { SupabaseAvatarRepository } from '@/infrastructure/backend/SupabaseAvatarRepository';

interface UseAvatarUploadDebugProps {
  userId: string;
  onChange: (avatarUrl: string | null) => void;
}

export const useAvatarUploadDebug = ({ userId, onChange }: UseAvatarUploadDebugProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const avatarRepository = useMemo(() => new SupabaseAvatarRepository(), []);
  const uploadAvatarUseCase = useMemo(() => new UploadAvatar(avatarRepository), [avatarRepository]);

  const uploadAvatar = useCallback(
    async (file: File | null) => {
      if (!file) {
        onChange(null);
        return;
      }

      setUploading(true);
      setError(null);

      try {
        const avatarUrl = await uploadAvatarUseCase.execute(userId, file);
        onChange(avatarUrl);
      } catch (e: unknown) {
        console.error('Error uploading avatar:', e);
        setError(`Error: ${(e as Error).message}`);
        onChange(null);
      } finally {
        setUploading(false);
      }
    },
    [userId, onChange, uploadAvatarUseCase]
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
