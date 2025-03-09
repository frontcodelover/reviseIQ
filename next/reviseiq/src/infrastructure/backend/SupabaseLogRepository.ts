import { supabase } from '@/infrastructure/backend/SupabaseClient';
import { LogRepository } from '@/domain/repositories/LogRepository';
import { parseISO, format } from 'date-fns';

export class SupabaseLogRepository implements LogRepository {
  async logAction(userId: string, action: string, count: number = 1): Promise<void> {
    try {
      // Vérifier que l'utilisateur est authentifié
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Utilisateur non authentifié');
			}
			
			console.log('userId:', userId);
			console.log('session.user.id:', session.user.id);

      // Vérifier que l'userId correspond à l'utilisateur authentifié
      if (userId !== session.user.id) {
        throw new Error('Utilisateur non autorisé');
      }

      // Vérifie si une action existe déjà pour cet utilisateur
      const { data: existingLog, error: fetchError } = await supabase.from('usage_logs').select('id, count').eq('user_id', userId).eq('action', action).maybeSingle();

      if (fetchError) {
        console.error('Erreur lors de la vérification des logs:', fetchError.message);
        throw new Error('Échec de la vérification des logs');
      }

      if (existingLog) {
        // Met à jour le compteur existant
        const { error: updateError } = await supabase
          .from('usage_logs')
          .update({
            count: existingLog.count + count,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingLog.id);

        if (updateError) {
          console.error('Erreur lors de la mise à jour:', updateError.message);
          throw new Error('Échec de la mise à jour du compteur');
        }
      } else {
        // Crée une nouvelle entrée
        const { error: insertError } = await supabase.from('usage_logs').insert({
          user_id: userId,
          action,
          count,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

        if (insertError) {
          console.error("Erreur lors de l'insertion:", insertError.message);
          throw new Error('Échec de la création du log');
        }
      }
    } catch (error) {
      console.error('Erreur inattendue:', error);
      throw error;
    }
  }

  async getUsageLogsByDay(userId: string): Promise<Record<string, Record<string, number>>> {
    // Récupérer les logs pour un utilisateur donné
    const { data: logs, error } = await supabase.from('usage_logs').select('timestamp, action, count').eq('user_id', userId);

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
