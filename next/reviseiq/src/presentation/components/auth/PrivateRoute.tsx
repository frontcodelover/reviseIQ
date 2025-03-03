'use client';

import { useAuth } from '@/presentation/context/AuthContext';
import { useRouter } from '@/i18n/navigation';
import { useEffect } from 'react';
import { Spinner } from '../dashboard/shared/Spinner';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Si le chargement est terminé et que l'utilisateur n'est pas connecté, rediriger vers la page de connexion
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Afficher un indicateur de chargement lorsque l'authentification est en cours de vérification
  if (loading) {
    return <Spinner />;
  }

  // Si l'utilisateur n'est pas connecté, ne rien rendre pendant la redirection
  if (!user) {
    return null;
  }

  // L'utilisateur est connecté, afficher le contenu protégé
  return <>{children}</>;
}
