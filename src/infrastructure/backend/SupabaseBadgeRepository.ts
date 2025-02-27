import { BadgeData, BadgeDataSchema } from '@/domain/entities/Badge';
import { BadgeRepository } from '@/domain/repositories/BadgeRepository';
import { supabase } from '@/infrastructure/backend/SupabaseClient';
import { RealtimeChannel } from '@supabase/supabase-js';

export class SupabaseBadgeRepository implements BadgeRepository {
  private channel: RealtimeChannel | null = null;

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

  async fetchUnreadBadges(userId: string): Promise<BadgeData[]> {
    // Modifier la requête pour joindre les informations des badges
    const { data, error } = await supabase
      .from('user_badges')
      .select(
        `
        id,
        user_id,
        badge_id,
        unlocked_at,
        is_read,
        badges (
          id,
          name,
          description,
          image_url
        )
      `
      )
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) {
      console.error('Erreur de fetch:', error);
      throw new Error(error.message);
    }

    // Valider les données avec Zod
    const validatedData = data?.map((item) => BadgeDataSchema.safeParse(item));
    const badges: BadgeData[] = [];

    validatedData?.forEach((result) => {
      if (result?.success) {
        badges.push(result.data);
      } else {
        console.error('Erreur de validation BadgeData:', result?.error);
      }
    });

    return badges;
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

  subsribeToBadgeChanges(userId: string, callback: (badgeData: BadgeData) => void) {
    if (this.channel) {
      this.unsubsribeFromBadgeChanges();
    }

    this.channel = supabase.channel(`badge_changes_${userId}`);

    this.channel
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_badges',
        },
        (payload) => {
          if (payload.eventType === 'INSERT' && !payload.new.is_read) {
            // adapter le payload.new au type BadgeData
            // Fetch the badge details from the badges table using badge_id
            supabase
              .from('badges')
              .select('*')
              .eq('id', payload.new.badge_id)
              .single()
              .then(({ data: badge, error }) => {
                if (error) {
                  console.error('Error fetching badge details:', error);
                  return;
                }

                if (badge) {
                  const newBadge: BadgeData = {
                    unlocked_at: payload.new.unlocked_at,
                    badges: {
                      id: badge.id,
                      name: badge.name,
                      description: badge.description,
                      image_url: badge.image_url,
                    },
                  };
                  callback(newBadge);
                }
              });
          }
        }
      )
      .subscribe();
  }

  unsubsribeFromBadgeChanges() {
    if (this.channel) {
      supabase.removeChannel(this.channel);
      this.channel = null;
    }
  }

  async markBadgesAsRead(userId: string, badgeIds: string[]): Promise<void> {
    if (badgeIds.length === 0) return;

    const { error } = await supabase
      .from('user_badges')
      .update({ is_read: true })
      .in('id', badgeIds);

    if (error) {
      console.error('Erreur lors de la mise à jour des badges:', error);
      throw new Error('Impossible de mettre à jour les badges');
    }
  }
}
