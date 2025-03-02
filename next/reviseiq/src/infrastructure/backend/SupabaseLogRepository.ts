import { supabase } from '@/infrastructure/backend/SupabaseClient';
import { LogRepository } from '@/domain/repositories/LogRepository';
import { parseISO, format, startOfDay, endOfDay } from 'date-fns';

export class SupabaseLogRepository implements LogRepository {
  async logAction(userId: string, action: string, count: number = 1): Promise<void> {
    const now = new Date();
    const startOfToday = startOfDay(now).toISOString();
    const endOfToday = endOfDay(now).toISOString();

    try {
      // Vérifie si une action similaire existe déjà pour aujourd'hui
      const { data: existingLog, error: fetchError } = await supabase
        .from('usage_logs')
        .select('id, count, timestamp')
        .eq('user_id', userId)
        .eq('action', action)
        .gte('timestamp', startOfToday)
        .lte('timestamp', endOfToday)
        .limit(1)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        // Ignore l'erreur si aucune donnée n'est trouvée
        console.error('Erreur lors de la vérification des logs existants :', fetchError.message);
        throw new Error('Failed to fetch existing logs');
      }

      if (existingLog) {
        // Met à jour l'entrée existante
        const { error: updateError } = await supabase
          .from('usage_logs')
          .update({ count: existingLog.count + count })
          .eq('id', existingLog.id);

        if (updateError) {
          console.error('Erreur lors de la mise à jour du log :', updateError.message);
          throw new Error('Failed to update log action');
        }
      } else {
        // Ajoute une nouvelle entrée si aucune similaire n'existe
        const { error: insertError } = await supabase.from('usage_logs').insert({
          user_id: userId,
          action,
          count,
          timestamp: now.toISOString(),
        });

        if (insertError) {
          console.error("Erreur lors de l'ajout du log :", insertError.message);
          throw new Error('Failed to log action');
        }
      }
    } catch (error) {
      console.error('Erreur inattendue lors de la gestion du log :', error);
      throw error;
    }
  }

  async getUsageLogsByDay(userId: string): Promise<Record<string, Record<string, number>>> {
    // Récupérer les logs pour un utilisateur donné
    const { data: logs, error } = await supabase
      .from('usage_logs')
      .select('timestamp, action, count')
      .eq('user_id', userId);

    if (error) {
      console.error('Erreur lors de la récupération des logs :', error.message);
      throw new Error('Impossible de récupérer les logs');
    }

    // Regrouper les logs par jour et par action
    const dailyUsage: Record<string, Record<string, number>> = {};
    logs?.forEach((log) => {
      const day = format(parseISO(log.timestamp), 'yyyy-MM-dd');
      if (!dailyUsage[day]) {
        dailyUsage[day] = {};
      }
      dailyUsage[day][log.action] = (dailyUsage[day][log.action] || 0) + log.count;
    });

    return dailyUsage;
  }
}
