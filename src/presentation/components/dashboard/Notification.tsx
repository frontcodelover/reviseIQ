import { BadgeData, BadgeDataSchema } from '@/domain/entities/Badge';
import { appContainer } from '@/infrastructure/config/AppContainer';
import { useAuth } from '@/presentation/context/AuthContext';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';

function Notification() {
  const { user } = useAuth();
  const [unreadBadges, setUnreadBadges] = useState([] as BadgeData[]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!user) return;

    appContainer.getBadgeService().subsribeToBadgeChanges(user.id, (badgeData) => {
      setUnreadBadges((prev) => [...prev, badgeData]);
    });

    async function fetchUnreadBadges() {
      if (!user) return;
      appContainer
        .getBadgeService()
        .fetchUnreadBadges(user.id)
        .then((badges) => {
          setUnreadBadges(badges as BadgeData[]);
        });
    }
    fetchUnreadBadges();

    return () => {
      appContainer.getBadgeService().unsubsribeFromBadgeChanges(user.id);
    };
  }, [user]);

  const handleClick = async () => {
    if (unreadBadges.length === 0) return;

    setShowPopup(true);

    const timeoutId = setTimeout(async () => {
      if (!user) return;
      try {
        // Valider les données avant de les envoyer
        const badgeIds = unreadBadges
          .map((badge) => {
            const result = BadgeDataSchema.safeParse(badge);
            if (result.success) {
              return result.data.badges.id; // Accéder à l'ID via badge.badges.id
            } else {
              console.error('Erreur de validation BadgeData:', result.error);
              return null; // Retourner null pour les badges invalides
            }
          })
          .filter((id): id is string => id !== null); // Filtrer les IDs null

        await appContainer.getBadgeService().markBadgesAsRead(user.id, badgeIds);
        setUnreadBadges([]);
        setShowPopup(false);
      } catch (error) {
        console.error('Erreur lors de la mise à jour des badges:', error);
      }
    }, 4000);

    return () => clearTimeout(timeoutId);
  };

  return (
    <div className="relative">
      <div className="relative cursor-pointer" onClick={handleClick}>
        {unreadBadges.length > 0 ? (
          <>
            <Bell className="h-6 w-6 fill-yellow-500 stroke-yellow-600" />
            <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500" />
          </>
        ) : (
          <Bell className="h-6 w-6 text-gray-500" />
        )}
      </div>

      {showPopup && unreadBadges.length > 0 && (
        <div className="absolute right-0 mt-2 w-64 rounded-lg bg-white p-4 shadow-lg">
          <p>Vous avez débloqué un nouveau badge !</p>
          <button className="mt-2 text-sm text-gray-500" onClick={() => setShowPopup(false)}>
            Fermer
          </button>
        </div>
      )}
    </div>
  );
}

export default Notification;
