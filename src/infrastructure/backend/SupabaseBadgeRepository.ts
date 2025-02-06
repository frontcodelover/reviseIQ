import { BadgeRepository } from '@/domain/repositories/BadgeRepository';
import { supabase } from '@/infrastructure/backend/SupabaseClient';
import { BadgeData } from '@/domain/entities/Badge';

export class SupabaseBadgeRepository implements BadgeRepository {
  async checkAndUnlockBadges(
    userId: string,
    stats: { flashcards_viewed: number; folders_viewed: number }
  ) {
    // Récupérer tous les badges
    const { data: badges, error: badgeError } = await supabase.from('badges').select('*');

    if (badgeError) {
      console.error('Erreur lors de la récupération des badges :', badgeError.message);
      return;
    }

    // Récupérer les badges déjà débloqués par l'utilisateur
    const { data: unlockedBadges, error: userBadgeError } = await supabase
      .from('user_badges')
      .select('badge_id')
      .eq('user_id', userId);

    if (userBadgeError) {
      console.error(
        'Erreur lors de la récupération des badges utilisateur :',
        userBadgeError.message
      );
      return;
    }

    const unlockedBadgeIds = unlockedBadges?.map((ub: { badge_id: string }) => ub.badge_id) || [];

    // Vérifier quels badges peuvent être débloqués
    for (const badge of badges || []) {
      if (unlockedBadgeIds.includes(badge.id)) continue;

      // Remplacer les variables dans les critères de déblocage
      const criteria = badge.criteria
        .replace('flashcards_viewed', stats.flashcards_viewed.toString())
        .replace('folders_viewed', stats.folders_viewed.toString());

      // Évaluer les critères de déblocage
      const criteriaMet = this.evaluateCriteria(criteria);
      if (criteriaMet) {
        // Débloquer le badge pour l'utilisateur
        const { error: insertError } = await supabase.from('user_badges').insert({
          user_id: userId,
          badge_id: badge.id,
        });

        if (insertError) {
          console.error('Erreur lors du déblocage du badge :', insertError.message);
        }
      }
    }
  }

  async getUserBadges(userId: string) {
    const { data, error } = await supabase
      .from('user_badges')
      .select(
        `
			unlocked_at,
			badges (
			id,
			  name,
			  description,
			  image_url
			)
		  `
      )
      .eq('user_id', userId);

    if (error) {
      console.error('Erreur lors de la récupération des badges :', error.message);
      throw new Error('Impossible de récupérer les badges');
    }

    // Formate les badges sous une forme plus lisible
    if (!data) {
      throw new Error('No data returned from the database');
    }

    return (data as unknown as BadgeData[]).map((item) => ({
      id: item.badges.id,
      name: item.badges.name,
      description: item.badges.description,
      image_url: item.badges.image_url,
      obtained_at: item.unlocked_at,
    }));
  }

  private evaluateCriteria(criteria: string): boolean {
    try {
      // Utiliser une fonction pour évaluer les critères
      const func = new Function('return ' + criteria);
      return func();
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error("Erreur lors de l'évaluation des critères :", errorMessage);
      return false;
    }
  }
}
