import { useState, useCallback } from 'react';
import { supabase } from '@/infrastructure/backend/SupabaseClient';

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

      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `public/${fileName}`;

      try {
        const { error: uploadError } = await supabase.storage
          .from('profile')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) {
          console.error('Erreur Supabase Storage:', uploadError);
          setError(`Erreur d'upload: ${uploadError.message}`);
          throw uploadError;
        }

        // Construct the public URL using the correct environment variable and path
        // Use VITE_SUPABASE_URL instead of NEXT_PUBLIC_SUPABASE_URL
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        if (!supabaseUrl) {
          console.error('VITE_SUPABASE_URL is not defined in the environment.');
          setError('Supabase URL is not defined.');
          onChange(null);
          return;
        }

        // Remove the extra 'public' from the URL construction
        const publicUrl = `${supabaseUrl}/storage/v1/object/public/profile/${filePath}`;
        onChange(publicUrl);
      } catch (e: unknown) {
        console.error("Erreur lors de l'upload de l'avatar:", e);
        setError(`Erreur: ${(e as Error).message}`);
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
