import { Folder } from '@/domain/entities/Folder';
import { ThemaGroupProps } from '@/domain/entities/User';
import { appContainer } from '@/infrastructure/config/AppContainer';
import { cn } from '@/lib/utils';
import { NewFolderBtn } from '@/presentation/components/dashboard/folders/NewFolderBtn';
import { useUserDeckStore } from '@/presentation/components/dashboard/folders/store/userDecksStore';
import { Spinner } from '@/presentation/components/dashboard/shared/Spinner';
import { Alert, AlertDescription, AlertTitle } from '@/presentation/components/ui/alert';
import { Button } from '@/presentation/components/ui/button';
import { Card, CardContent } from '@/presentation/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/presentation/components/ui/collapsible';
import { ChevronDown, Terminal, CornerDownRight } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface GroupedDecks {
  [key: string]: Folder[];
}

const ThemaGroup = ({ thema, decks }: ThemaGroupProps) => {
  const { isThemaOpen, toggleThema } = useUserDeckStore();
  const isOpen = isThemaOpen(thema);

  return (
    <Card className="mb-4 w-full">
      <Collapsible open={isOpen} onOpenChange={() => toggleThema(thema)}>
        <div className="flex items-center p-4">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  isOpen ? 'rotate-0' : '-rotate-90'
                )}
              />
            </Button>
          </CollapsibleTrigger>
          <h3 className="ml-2 flex-grow text-xl font-semibold">{thema}</h3>
        </div>

        <CollapsibleContent>
          <CardContent className="pt-1">
            {decks.map((deck) => (
              <div key={deck.id} className="flex items-center justify-center gap-4 px-8 py-2">
                <CornerDownRight />

                <div className="flex-grow">
                  <Link
                    to={`/dashboard/folders/${deck.id}`}
                    className="font-medium hover:underline"
                  >
                    {deck.name}
                  </Link>
                </div>
              </div>
            ))}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export function UserDecks() {
  const [decks, setDecks] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUserDecks = async () => {
      try {
        const data = await appContainer.getUserService().getUserFolders();
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
      const themaKey = deck.thema || 'other';
      // Utilisation de la clé de traduction complète
      const translationKey = `dashboard.folder.thema.${themaKey.toLowerCase()}`;
      const translatedThema = t(translationKey);

      if (!groups[translatedThema]) {
        groups[translatedThema] = [];
      }
      groups[translatedThema].push(deck);
      return groups;
    }, {});
  }, [decks, t]);

  if (loading) {
    return <Spinner className="mt-8" />;
  }

  const hasDecks = decks.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-4 flex justify-end gap-4">
        <NewFolderBtn />
      </div>

      {hasDecks ? (
        Object.entries(groupedDecks).map(([thema, decksInThema]) => (
          <ThemaGroup key={thema} thema={thema} decks={decksInThema} />
        ))
      ) : (
        <Alert className="bg-gray-50">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Ooops</AlertTitle>
          <AlertDescription>{t('dashboard.folder.nofolder')}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export default UserDecks;
