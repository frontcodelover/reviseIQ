import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  // Affiche un indicateur de chargement pendant la récupération de l'utilisateur
  if (loading) {
    return <p className="text-center text-gray-500">Chargement...</p>;
  }

  // Si l'utilisateur n'est pas connecté, redirige vers la page de connexion
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Sinon, affiche le contenu protégé
  return <>{children}</>;
}

export default ProtectedRoute;
