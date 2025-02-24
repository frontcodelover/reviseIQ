import { BadgeData, BadgeDataSchema } from '@/domain/entities/Badge';
import { appContainer } from '@/infrastructure/config/AppContainer';
import { Button } from '@/presentation/components/ui/button';
import { useAuth } from '@/presentation/context/AuthContext';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

function Notification() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [unreadBadges, setUnreadBadges] = useState([] as BadgeData[]);

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

    const timeoutId = setTimeout(async () => {
      if (!user) return;
      try {
        const badgeIds = unreadBadges
          .map((badge) => {
            const result = BadgeDataSchema.safeParse(badge);
            if (result.success) {
              return result.data.badges.id;
            } else {
              console.error(result.error);
              return null;
            }
          })
          .filter((id): id is string => id !== null);

        await appContainer.getBadgeService().markBadgesAsRead(user.id, badgeIds);
        setUnreadBadges([]);
      } catch (error) {
        console.error(error);
      }
    }, 4000);

    return () => clearTimeout(timeoutId);
  };

  return (
    <div className="relative">
      <div className="relative cursor-pointer" onClick={handleClick}>
        {unreadBadges.length > 0 ? (
          <Button
            variant="outline"
            size="icon" // Changé de 'sm' à 'icon'
            onClick={() =>
              toast(t('dashboard.congrats'), {
                description: t('dashboard.congratsMessage'),
              })
            }
          >
            <Bell className="h-[1.2rem] w-[1.2rem] fill-yellow-500 stroke-yellow-600" />
            <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500" />
          </Button>
        ) : (
          <Button variant="outline" size="icon">
            {' '}
            <Bell className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        )}
      </div>
    </div>
  );
}

export default Notification;
