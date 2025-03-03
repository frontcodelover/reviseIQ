'use client';
import { Folder } from '@/domain/entities/Folder';
import { appContainer } from '@/infrastructure/config/AppContainer';
import { cn } from '@/lib/utils';
import { Spinner } from '@/presentation/components/dashboard/shared/Spinner';
import { Button } from '@/presentation/components/ui/button';
import { Card, CardContent } from '@/presentation/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/presentation/components/ui/collapsible';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/presentation/components/ui/dialog';
import { useToast } from '@/presentation/hooks/use-toast';
import { ChevronDown, CornerDownRight, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { LocaleLink as Link } from '../../ui/locale-link';

import { useUserDeckStore } from './store/userDecksStore';

export interface ThemaGroupProps {
  thema: string;
  decks: Folder[];
  onDeckDeleted: () => Promise<void>;
}

export function ThemaGroup({ thema, decks, onDeckDeleted }: ThemaGroupProps) {
  const { isThemaOpen, toggleThema } = useUserDeckStore();
  const isOpen = isThemaOpen(thema);
  const { toast } = useToast();
  const t = useTranslations();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deckToDelete, setDeckToDelete] = useState<Folder | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  function handleDeleteClick(deck: Folder) {
    setDeckToDelete(deck);
    setDeleteDialogOpen(true);
  }

  async function confirmDelete() {
    if (!deckToDelete?.id) return;

    setIsDeleting(true);
    try {
      await appContainer.getFolderService().deleteFolder(deckToDelete.id);
      toast({
        title: t('dashboard.folder.deleteSuccess'),
        description: t('dashboard.folder.deleteSuccessDescription', { name: deckToDelete.name }),
      });
      onDeckDeleted(); // Déclencher le rechargement des dossiers
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        variant: 'destructive',
        title: t('dashboard.folder.deleteError'),
        description: t('dashboard.folder.deleteErrorDescription'),
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setDeckToDelete(null);
    }
  }

  return (
    <>
      <Card className='mb-4 w-full'>
        <Collapsible open={isOpen} onOpenChange={() => toggleThema(thema)}>
          <div className='flex items-center p-4'>
            <CollapsibleTrigger asChild>
              <Button variant='ghost' size='sm' className='h-9 w-9 p-0'>
                <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', isOpen ? 'rotate-0' : '-rotate-90')} />
              </Button>
            </CollapsibleTrigger>
            <h3 className='ml-2 flex-grow text-xl font-semibold'>{thema}</h3>
          </div>

          <CollapsibleContent>
            <CardContent className='pt-1'>
              {decks.map((deck) => (
                <div key={deck.id} className='flex items-center justify-between gap-4 px-8 py-2'>
                  <div className='flex items-center gap-2'>
                    <CornerDownRight className='h-4 w-4 text-muted-foreground' />
                    <Link href={`/dashboard/folders/${deck.id}`} className='font-medium hover:underline'>
                      {deck.name}
                    </Link>
                  </div>
                  <Button onClick={() => handleDeleteClick(deck)} variant='ghost' size='sm' className='text-destructive hover:bg-destructive/10 hover:text-destructive'>
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('dashboard.folder.deleteConfirmTitle')}</DialogTitle>
            <DialogDescription>{t('dashboard.folder.deleteConfirmDescription', { name: deckToDelete?.name })}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={() => setDeleteDialogOpen(false)} disabled={isDeleting}>
              {t('flashcard.cancel')}
            </Button>
            <Button variant='destructive' onClick={confirmDelete} disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <Spinner className='mr-2 h-4 w-4' />
                  {t('common.deleting')}
                </>
              ) : (
                t('common.delete')
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
