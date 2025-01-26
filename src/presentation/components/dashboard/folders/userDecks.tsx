import { useEffect, useState, useMemo } from 'react';

import { SupabaseUserRepository } from '@/infrastructure/backend/SupabaseUserRepository';
import { GetUserDecksUseCase } from '@/application/useCases/user/GetUserDecks.usecase';

import { useTranslation } from 'react-i18next';
import CardNewFolder from '@/presentation/components/dashboard/folders/newFolder/CardNewFolder';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Terminal } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { Folder } from '@/domain/entities/Folder';
import { ThemaGroupProps } from '@/domain/entities/User';

interface GroupedDecks {
  [key: string]: Folder[];
}

const userReposirory = new SupabaseUserRepository();
const getUserDecksUseCase = new GetUserDecksUseCase(userReposirory);

const ThemaGroup = ({ thema, decks }: ThemaGroupProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col justify-center gap-2">
      <button onClick={() => setIsOpen(!isOpen)} className="flex gap-2 hover:text-red-600">
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-200 ${isOpen ? '' : '-rotate-90'}`}
        />
        <h2 className="flex flex-1 items-center border-b pb-2 text-gray-700">
          <span className="font-semibold">{thema}</span>
        </h2>
      </button>
      {isOpen && (
        <div className="flex flex-col gap-1 pl-6">
          {decks.map((deck) => (
            <div key={deck.id} className="flex gap-2 border-b py-3">
              👉
              <div className="item flex flex-1 flex-col">
                <Link
                  to={`/dashboard/folders/${deck.id}`}
                  className="text-gray-900 hover:text-red-600 hover:underline"
                >
                  {deck.name}
                </Link>
                <p className="text-xs text-gray-500">{deck.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function UserDecks(): JSX.Element {
  const [decks, setDecks] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUserDecks = async () => {
      try {
        const data = await getUserDecksUseCase.execute();
        if (Array.isArray(data)) {
          setDecks(data as Folder[]);
        } else {
          setDecks([]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des decks utilisateur :', error);
        setDecks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDecks();
  }, []);

  const groupedDecks = useMemo(() => {
    return decks.reduce((groups: GroupedDecks, deck) => {
      const thema = deck.thema || t('dashboard.folder.thema.other');
      if (!groups[thema]) {
        groups[thema] = [];
      }
      groups[thema].push(deck);
      return groups;
    }, {});
  }, [decks, t]);

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="flex flex-col gap-6">
      {decks.length === 0 ? (
        <>
          <CardNewFolder />
          <Alert className="bg-gray-50">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Ooops</AlertTitle>
            <AlertDescription>{t('dashboard.folder.nofolder')}</AlertDescription>
          </Alert>
        </>
      ) : (
        <>
          <CardNewFolder />
          {Object.entries(groupedDecks).map(([thema, decksInThema]) => (
            <ThemaGroup key={thema} thema={thema} decks={decksInThema} />
          ))}
        </>
      )}
    </div>
  );
}

export default UserDecks;
