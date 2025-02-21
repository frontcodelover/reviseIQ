import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Folder } from '@/domain/entities/Folder';
import { ThemaGroupProps } from '@/domain/entities/User';
import { appContainer } from '@/infrastructure/config/AppContainer';
import { cn } from '@/lib/utils';
import CardNewFolder from '@/presentation/components/dashboard/folders/newFolder/CardNewFolder';
import { useUserDeckStore } from '@/presentation/components/dashboard/folders/store/userDecksStore';
import { ChevronDown, Terminal } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface GroupedDecks {
  [key: string]: Folder[];
}

const ThemaGroup = ({ thema, decks }: ThemaGroupProps) => {
  const { isOpen, toggleIsOpen } = useUserDeckStore();

  return (
    <Card className="mb-4 w-full">
      <Collapsible open={isOpen} onOpenChange={toggleIsOpen}>
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
              <div key={deck.id} className="flex items-center gap-4 px-8 py-2">
                <span>👉</span>
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
      const thema = deck.thema || t('dashboard.folder.thema.other');
      if (!groups[thema]) {
        groups[thema] = [];
      }
      groups[thema].push(deck);
      return groups;
    }, {});
  }, [decks, t]);

  if (loading) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-4 border-gray-200"></div>
      </div>
    );
  }

  const hasDecks = decks.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-4 flex justify-end gap-4">
        <CardNewFolder />
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
