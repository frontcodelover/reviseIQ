import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  RotateCcw,
  Inbox,
  FileQuestion,
  WalletCards,
  ArrowLeft,
  ArrowRight,
  Shuffle,
} from 'lucide-react';
import { Flashcard } from '@/domain/entities/Flashcard';
import Tooltip from '@/presentation/components/ui/tooltip/Tooltip';

interface DockNavigateProps {
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>;
  currentIndex: number;
  flashcards: Flashcard[];
  deckId: string | undefined;
  handleShuffle: () => void;
}

const DockContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  bottom: 30px;
  align-items: center;
  min-width: 300px;
  height: 60px;
  background-color: white;
  border-radius: 32px;
  border: 1px solid #dedede;
  gap: 2rem;
  padding: 2rem;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;

const ItemSeparator = styled.div`
  width: 1px;
  height: 40px;
  border-left: 1px solid #d4d4d4;
`;

const HoverableLink = styled(Link)`
  padding: 0.2rem;
  color: #8a8a8a;
  &:hover {
    border-radius: 50%;
    color: #0077ff;
  }
  &:hover svg {
    transition: all 0.2s;
    transform: scale(1.5);
  }
  &:disabled {
    opacity: 0.5;
    transform: scale(1);
    color: #8a8a8a;
  }
  &:focus {
    outline: none;
  }
`;

const HoverableButton = styled.button`
  padding: 0.2rem;
  color: #8a8a8a;
  transition: all 0.2s;
  &:hover {
    border-radius: 50%;
    color: #28a745;
  }
  &:hover svg {
    transition: all 0.2s;
    transform: scale(1.5);
  }
  &:disabled svg {
    opacity: 0.5;
    transform: scale(1) !important;
    color: #8a8a8a;
  }
  &:focus {
    outline: none;
  }
`;

const HoverableButtonRetry = styled.button`
  padding: 0.2rem;
  color: #8a8a8a;
  transition: all 0.2s;
  &:hover {
    border-radius: 50%;
    color: #ff6a07;
  }
  &:hover svg {
    transition: all 0.8s;
    transform: rotate(-360deg);
  }
  &:disabled svg {
    opacity: 0.5;
    transform: scale(1) !important;
    color: #8a8a8a;
  }
  &:focus {
    outline: none;
  }
`;

function DockNavigate({
  setCurrentIndex,
  setShowAnswer,
  currentIndex,
  flashcards,
  deckId,
  handleShuffle,
}: DockNavigateProps) {
  return (
    <DockContainer>
      <HoverableLink to="/dashboard/folders">
        <Inbox />
      </HoverableLink>
      <ItemSeparator />

      <HoverableButton
        onClick={() => {
          setCurrentIndex((prev) => prev - 1);
          setShowAnswer(false);
        }}
        disabled={currentIndex === 0}
      >
        <Tooltip text="Précédente" disabled={currentIndex === 0}>
          <ArrowLeft />
        </Tooltip>
      </HoverableButton>

      <HoverableButton
        onClick={() => {
          setCurrentIndex((prev) => prev + 1);
          setShowAnswer(false);
        }}
        disabled={currentIndex === flashcards.length}
      >
        <Tooltip text="Suivante" disabled={currentIndex === flashcards.length}>
          <ArrowRight />
        </Tooltip>
      </HoverableButton>

      <HoverableButtonRetry
        onClick={() => {
          setCurrentIndex(0);
          setShowAnswer(false);
        }}
        disabled={currentIndex === 0}
      >
        <Tooltip text="Recommencer" disabled={currentIndex === 0}>
          <RotateCcw />
        </Tooltip>
      </HoverableButtonRetry>
      <ItemSeparator />

      <HoverableButton onClick={handleShuffle}>
        <Tooltip text="Mélanger">
          <Shuffle />
        </Tooltip>
      </HoverableButton>

      <HoverableLink to={`/dashboard/folders/${deckId}/`}>
        <Tooltip text="Mode flashcards">
          <WalletCards />
        </Tooltip>
      </HoverableLink>

      {flashcards[0]?.ia_generated ? (
        <HoverableLink to={`/dashboard/folders/${deckId}/quiz`}>
          <Tooltip text="Mode quiz">
            <FileQuestion />
          </Tooltip>
        </HoverableLink>
      ) : (
        <FileQuestion style={{ color: '#8a8a8a', cursor: 'not-allowed' }} />
      )}
    </DockContainer>
  );
}

export default DockNavigate;
