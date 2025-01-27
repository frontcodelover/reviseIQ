import React from 'react';
import styled from 'styled-components';
import { House } from 'lucide-react';
import { FileQuestion } from 'lucide-react';
import { WalletCards } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { Flashcard } from '@/domain/entities/Flashcard';
import { Link } from 'react-router-dom';

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
  padding: 0.7rem;
  color: #8a8a8a;
  transition: all 0.8s;
  &:hover {
    border-radius: 50%;
    transform: scale(1.5);
    color: #0077ff;
  }
  &:disabled {
    opacity: 0.5;
  }
  &:focus {
    outline: none;
  }
`;

const HoverableButton = styled.button`
  padding: 0.7rem;
  color: #8a8a8a;
  transition: all 0.3s;
  &:hover {
    border-radius: 50%;
    transform: scale(1.5);
    color: #0b0b0b;
  }
  &:disabled {
    opacity: 0.5;
  }
  &:focus {
    outline: none;
  }
`;

interface DockNavigateProps {
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>;
  currentIndex: number;
  flashcards: Flashcard[];
  deckId: string | undefined;
}

function DockNavigate({
  setCurrentIndex,
  setShowAnswer,
  currentIndex,
  flashcards,
  deckId,
}: DockNavigateProps) {
  return (
    <DockContainer>
      <HoverableLink to="/dashboard/folders">
        <House />
      </HoverableLink>
      <ItemSeparator />
      <HoverableButton
        onClick={() => {
          setCurrentIndex((prev) => prev + 1);
          setShowAnswer(false);
        }}
        disabled={currentIndex === 0}
      >
        <ArrowLeft />
      </HoverableButton>
      <HoverableButton
        onClick={() => {
          setCurrentIndex((prev) => prev + 1);
          setShowAnswer(false);
        }}
        disabled={currentIndex === flashcards.length - 1}
      >
        <ArrowRight />
      </HoverableButton>

      <ItemSeparator />
      <HoverableLink to={`/dashboard/folders/${deckId}/`}>
        <WalletCards />
      </HoverableLink>

      {flashcards[0]?.ia_generated ? (
        <HoverableLink to={`/dashboard/folders/${deckId}/quiz`}>
          <FileQuestion />
        </HoverableLink>
      ) : (
        <FileQuestion aria-disabled className="opacity-50" />
      )}
    </DockContainer>
  );
}

export default DockNavigate;
