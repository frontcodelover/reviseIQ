export interface LogRepository {
  logAction(userId: string, action: string, count: number): Promise<void>;
  getUsageLogsByDay(userId: string): Promise<Record<string, Record<string, number>>>;
}
