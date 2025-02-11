export interface AvatarRepository {
  uploadAvatar(userId: string, file: File): Promise<string>;
  deleteAvatar(avatarUrl: string): Promise<void>;
}
