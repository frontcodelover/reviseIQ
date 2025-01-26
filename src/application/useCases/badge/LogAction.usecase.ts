import { LogRepository } from '@/domain/repositories/LogRepository';

export class LogActionUseCase {
  constructor(private logRepository: LogRepository) {}

  async execute(userId: string, action: string, count: number = 1): Promise<void> {
    return this.logRepository.logAction(userId, action, count);
  }
}
