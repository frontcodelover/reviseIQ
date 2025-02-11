import { AvatarRepository } from '@/domain/repositories/AvatarRepository';
import { supabase } from '@/infrastructure/backend/SupabaseClient';

export class SupabaseAvatarRepository implements AvatarRepository {
  async uploadAvatar(userId: string, file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `public/${fileName}`;

    const { error } = await supabase.storage.from('profile').upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

    if (error) {
      console.error('Supabase Storage Error:', error);
      throw error;
    }

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl) {
      console.error('VITE_SUPABASE_URL is not defined in the environment.');
      throw new Error('Supabase URL is not defined.');
    }

    return `${supabaseUrl}/storage/v1/object/public/profile/${filePath}`;
  }

  async deleteAvatar(avatarUrl: string): Promise<void> {
    const filePath = avatarUrl.split('/').pop();
    if (!filePath) {
      console.error('Invalid avatar URL:', avatarUrl);
      throw new Error('Invalid avatar URL');
    }

    const { error } = await supabase.storage.from('profile').remove([filePath]);

    if (error) {
      console.error('Supabase Storage Error:', error);
      throw error;
    }
  }
}
