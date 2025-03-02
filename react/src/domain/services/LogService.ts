import { LogRepository } from '@/domain/repositories/LogRepository';

export class LogService {
  constructor(private readonly logRepository: LogRepository) {}

  async logAction(userId: string, action: string, count: number = 1): Promise<void> {
    return this.logRepository.logAction(userId, action, count);
  }

  getUsageLogsByDay(userId: string): Promise<Record<string, Record<string, number>>> {
    return this.logRepository.getUsageLogsByDay(userId);
  }
}
