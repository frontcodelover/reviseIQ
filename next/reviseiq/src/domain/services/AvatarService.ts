import { AvatarRepository } from '../repositories/AvatarRepository';

export class AvatarService {
  constructor(private readonly avatarRepository: AvatarRepository) {}

  async uploadAvatar(userId: string, file: File): Promise<string> {
    try {
      return await this.avatarRepository.uploadAvatar(userId, file);
    } catch (error: unknown) {
      console.error('Error uploading avatar:', error);
      throw new Error(`Failed to upload avatar: ${(error as Error).message}`);
    }
  }
}
