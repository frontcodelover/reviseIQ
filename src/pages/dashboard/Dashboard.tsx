import { useState, useEffect } from 'react';
import FirstTimeForm from '@/components/dashboard/FirstTimeForm';
import { useAuth } from '@/context/AuthContext';

function Dashboard() {
  const { user } = useAuth();
  const [isFirstTime, setIsFirstTime] = useState(false);

  useEffect(() => {
    const firstTime = localStorage.getItem('isFirstTime');
    if (!firstTime) {
      setIsFirstTime(true);
    }
  }, []);

  const handleFormSubmit = () => {
    localStorage.setItem('isFirstTime', 'false');
    setIsFirstTime(false);
  };

  return (
    <div className="container mx-auto">
      {!isFirstTime && user ? (
        <FirstTimeForm user={user} onSubmit={handleFormSubmit} />
      ) : (
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Bienvenue</h1>
        </div>
      )}
    </div>
  );
}

export default Dashboard;