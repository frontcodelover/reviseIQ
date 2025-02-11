import { AvatarRepository } from '@/domain/repositories/AvatarRepository';

export class UploadAvatar {
  private avatarRepository: AvatarRepository;

  constructor(avatarRepository: AvatarRepository) {
    this.avatarRepository = avatarRepository;
  }

  async execute(userId: string, file: File): Promise<string> {
    try {
      return await this.avatarRepository.uploadAvatar(userId, file);
    } catch (error: unknown) {
      console.error('Error uploading avatar:', error);
      throw new Error(`Failed to upload avatar: ${(error as Error).message}`);
    }
  }
}
