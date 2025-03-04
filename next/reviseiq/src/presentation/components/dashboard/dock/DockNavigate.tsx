import { type Flashcard } from '@/domain/entities/Flashcard';
import { IconButton } from '@/presentation/components/dashboard/dock/ui/IconButton';
import { Button } from '@/presentation/components/ui/button';
import { ArrowLeft, ArrowRight, FileQuestion, Folder, RotateCcw, Shuffle } from 'lucide-react';
import React from 'react';
import { useTranslations } from 'next-intl';
import { LocaleLink as Link } from '../../ui/locale-link';

import Delete from './actions/Delete';

interface DockNavigateProps {
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>;
  currentIndex: number;
  flashcards: Flashcard[];
  deckId: string | undefined;
  handleShuffle: () => void;
  isOwner: boolean;
}

export function DockNavigate({ setCurrentIndex, setShowAnswer, currentIndex, flashcards, deckId, handleShuffle, isOwner }: DockNavigateProps) {
  const t = useTranslations();

  const Separator = () => <div className='h-10 w-px bg-border' />;

  return (
    <div className='fixed bottom-8 flex h-[60px] min-w-[300px] items-center justify-center gap-3 rounded-full border bg-background px-8 shadow-sm'>
      <Link to='/dashboard/folders'>
        <IconButton tooltipText={t('flashcard.backFolders')}>
          <Folder className='h-5 w-5' />
        </IconButton>
      </Link>

      {isOwner && <Delete deckId={deckId} isOwner={isOwner} />}

      <Separator />

      <IconButton
        onClick={() => {
          setCurrentIndex((prev) => prev - 1);
          setShowAnswer(false);
        }}
        disabled={currentIndex === 0}
        tooltipText={t('flashcard.previousCard')}
      >
        <ArrowLeft className='h-5 w-5' />
      </IconButton>

      <IconButton
        onClick={() => {
          if (currentIndex < flashcards.length) {
            setCurrentIndex(currentIndex + 1);
            setShowAnswer(false);
          }
        }}
        disabled={currentIndex >= flashcards.length}
        tooltipText={t('flashcard.nextCard')}
      >
        <ArrowRight className='h-5 w-5' />
      </IconButton>

      <IconButton
        onClick={() => {
          setCurrentIndex(0);
          setShowAnswer(false);
        }}
        disabled={currentIndex === 0}
        tooltipText={t('flashcard.restart')}
        className='hover:text-orange-500'
      >
        <RotateCcw className='h-5 w-5 transition-transform duration-700 hover:rotate-[-360deg]' />
      </IconButton>

      <Separator />

      <IconButton onClick={handleShuffle} tooltipText={t('flashcard.randomCard')}>
        <Shuffle className='h-5 w-5' />
      </IconButton>

      {flashcards[0]?.ia_generated ? (
        <Link to={`/dashboard/folders/${deckId}/quiz`}>
          <IconButton tooltipText={t('flashcard.quizMode')}>
            <FileQuestion className='h-5 w-5' />
          </IconButton>
        </Link>
      ) : (
        <Button variant='ghost' size='icon' disabled className='cursor-not-allowed opacity-50'>
          <FileQuestion className='h-5 w-5' />
        </Button>
      )}
    </div>
  );
}
