import { supabase } from '@/services/supabaseClient';

export class BadgeService {
  async checkAndUnlockBadges(
    userId: string,
    stats: { flashcards_viewed: number; folders_viewed: number }
  ) {
    // Récupérer tous les badges
    const { data: badges, error: badgeError } = await supabase
      .from('badges')
      .select('*');

    if (badgeError) {
      console.error(
        'Erreur lors de la récupération des badges :',
        badgeError.message
      );
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

    const unlockedBadgeIds = unlockedBadges?.map((ub) => ub.badge_id) || [];

    // Vérifier quels badges peuvent être débloqués
    for (const badge of badges || []) {
      if (unlockedBadgeIds.includes(badge.id)) continue;

      const criteriaMet = eval(
        badge.criteria
          .replace('flashcards_viewed', stats.flashcards_viewed)
          .replace('folders_viewed', stats.folders_viewed)
      );
      if (criteriaMet) {
        // Débloquer le badge pour l'utilisateur
        const { error: insertError } = await supabase
          .from('user_badges')
          .insert({
            user_id: userId,
            badge_id: badge.id,
          });

        if (insertError) {
          console.error(
            'Erreur lors du déblocage du badge :',
            insertError.message
          );
        } else {
          console.log(`Badge débloqué : ${badge.name}`);
        }
      }
    }
  }

  async getUserBadges(userId: string) {
    const { data, error } = await supabase
      .from('user_badges')
      .select(
        `
		badges (
		  name,
		  description,
		  image_url
		)
	  `
      )
      .eq('user_id', userId);

    if (error) {
      console.error(
        'Erreur lors de la récupération des badges :',
        error.message
      );
      throw new Error('Impossible de récupérer les badges');
    }

    // Formate les badges sous une forme plus lisible
    return data?.map((record) => record.badges) || [];
  }
}
