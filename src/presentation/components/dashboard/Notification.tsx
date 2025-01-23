import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { supabase } from '@/infrastructure/backend/SupabaseClient';
import { useAuth } from '@/presentation/context/AuthContext';

interface Badge {
  id: string;
  user_id: string;
  badge_id: string;
  is_read: boolean;
}

function Notification() {
  const { user } = useAuth();
  const [unreadBadges, setUnreadBadges] = useState([] as Badge[]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    async function fetchUnreadBadges() {
      if (!user) return;
      const { data, error } = await supabase
        .from('user_badges')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_read', false);

      if (error) {
        console.error('Erreur de fetch:', error);
        return;
      }
      setUnreadBadges(data || []);
    }

    fetchUnreadBadges();

    const channel = supabase
      .channel('badge_changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Écoute INSERT et UPDATE
          schema: 'public',
          table: 'user_badges',
        },
        (payload) => {
          if (payload.eventType === 'INSERT' && !payload.new.is_read) {
            setUnreadBadges((prev) => [...prev, payload.new as Badge]);
          } else if (payload.eventType === 'UPDATE' && payload.new.is_read) {
            setUnreadBadges((prev) => prev.filter((badge) => badge.id !== payload.new.id));
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [user]);

  const handleClick = async () => {
    if (unreadBadges.length === 0) return;

    setShowPopup(true);

    // Mise à jour individuelle de chaque badge non lu
    const timeoutId = setTimeout(async () => {
      for (const badge of unreadBadges) {
        const { error } = await supabase
          .from('user_badges')
          .update({ is_read: true })
          .eq('id', badge.id);

        if (error) {
          console.error('Erreur lors de la mise à jour:', error);
        }
      }
      setShowPopup(false);
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
