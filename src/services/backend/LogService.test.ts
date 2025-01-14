import { describe, it, expect, vi } from 'vitest';
import { LogService } from './LogService';
import { supabase } from '@/services/supabaseClient';

vi.mock('@/services/supabaseClient', () => ({
	supabase: {
		from: vi.fn().mockReturnThis(),
		select: vi.fn().mockReturnThis(),
		eq: vi.fn().mockReturnThis(),
	},
}));

describe('LogService', () => {
	describe('getUsageLogsByDay', () => {
		it('should return grouped logs by day and action', async () => {
			const mockLogs = [
				{ timestamp: '2023-10-01T10:00:00Z', action: 'login', count: 1 },
				{ timestamp: '2023-10-01T12:00:00Z', action: 'login', count: 2 },
				{ timestamp: '2023-10-02T09:00:00Z', action: 'logout', count: 1 },
			];
			
			// @ts-expect-error mock
			supabase.from('logs').select().eq.mockResolvedValueOnce({ data: mockLogs, error: null });
			
			const logService = new LogService();
			const result = await logService.getUsageLogsByDay('user123');
			
			expect(result).toEqual({
				'2023-10-01': { login: 3 },
				'2023-10-02': { logout: 1 },
			});
		});
		
		it('should handle errors when fetching logs', async () => {
			const mockError = { message: 'Error fetching logs' };
			// @ts-expect-error mock
			supabase.from().select().eq.mockResolvedValueOnce({ data: null, error: mockError });
			
			const logService = new LogService();
			
			await expect(logService.getUsageLogsByDay('user123')).rejects.toThrow('Impossible de récupérer les logs');
		});
		
		it('should return an empty object if no logs are found', async () => {
			// @ts-expect-error mock
			supabase.from().select().eq.mockResolvedValueOnce({ data: [], error: null });

			const logService = new LogService();
			const result = await logService.getUsageLogsByDay('user123');

			expect(result).toEqual({});
		});
	});
});