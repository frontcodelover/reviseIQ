import { useEffect, useState, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SupabaseUserRepository } from '@/infrastructure/backend/SupabaseUserRepository';
import { GetUserDecksUseCase } from '@/application/useCases/user/GetUserDecks.usecase';
import { Folder } from '@/domain/entities/Folder';
import { ThemaGroupProps } from '@/domain/entities/User';
import CardNewFolder from '@/presentation/components/dashboard/folders/newFolder/CardNewFolder';
import { Alert as AlertUI, AlertDescription } from '@/components/ui/alert';
import { Terminal as TerminalIcon } from 'lucide-react';
import { Box, Typography, IconButton, Card, CardContent, CircularProgress } from '@mui/joy';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/joy/styles';
import { ChevronDown as ChevronDownIcon } from 'lucide-react';

interface GroupedDecks {
  [key: string]: Folder[];
}

const userReposirory = new SupabaseUserRepository();
const getUserDecksUseCase = new GetUserDecksUseCase(userReposirory);

const Link = styled(RouterLink)({
  textDecoration: 'none',
  color: 'inherit',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const ChevronDown = styled(ChevronDownIcon)<{ isOpen: boolean }>(({ isOpen }) => ({
  transform: isOpen ? 'none' : 'rotate(-90deg)',
  transition: 'transform 0.2s ease-in-out', // Optional: Add a smooth transition
}));

const ThemaGroup = ({ thema, decks }: ThemaGroupProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card variant="outlined" sx={{ width: '100%', mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        <IconButton onClick={() => setIsOpen(!isOpen)} size="sm" variant="plain" color="neutral">
          <ChevronDown isOpen={isOpen} />
        </IconButton>
        <Typography level="h3" sx={{ flexGrow: 1, ml: 1, fontSize: '1.25rem' }}>
          {thema}
        </Typography>
      </Box>
      <Collapse in={isOpen} orientation="vertical">
        <CardContent sx={{ pt: 1 }}>
          {decks.map((deck) => (
            <Box
              key={deck.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                px: 4,
                py: 1,
              }}
            >
              <Typography>👉</Typography>
              <Box sx={{ flexGrow: 1 }}>
                <Link to={`/dashboard/folders/${deck.id}`}>
                  <Typography fontWeight="md">{deck.name}</Typography>
                </Link>
              </Box>
            </Box>
          ))}
        </CardContent>
      </Collapse>
    </Card>
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

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
        <CircularProgress />
      </Box>
    );

  const hasDecks = decks.length > 0;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', gap: 2, mb: 2 }}>
        <CardNewFolder />
      </Box>

      {hasDecks ? (
        Object.entries(groupedDecks).map(([thema, decksInThema]) => (
          <ThemaGroup key={thema} thema={thema} decks={decksInThema} />
        ))
      ) : (
        <AlertUI className="bg-gray-50">
          <TerminalIcon className="h-4 w-4" />
          <AlertTitle>Ooops</AlertTitle>
          <AlertDescription>{t('dashboard.folder.nofolder')}</AlertDescription>
        </AlertUI>
      )}
    </Box>
  );
}

export default UserDecks;
