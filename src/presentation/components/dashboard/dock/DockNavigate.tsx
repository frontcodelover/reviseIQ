import React from 'react';
import { Link } from 'react-router-dom';
import {
  RotateCcw,
  Folder,
  FileQuestion,
  ArrowLeft,
  ArrowRight,
  Shuffle,
} from 'lucide-react';
import { Button } from "@/presentation/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/presentation/components/ui/tooltip";
import { type Flashcard } from '@/domain/entities/Flashcard';
import { cn } from "@/lib/utils";

interface DockNavigateProps {
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>;
  currentIndex: number;
  flashcards: Flashcard[];
  deckId: string | undefined;
  handleShuffle: () => void;
}

export function DockNavigate({
  setCurrentIndex,
  setShowAnswer,
  currentIndex,
  flashcards,
  deckId,
  handleShuffle,
}: DockNavigateProps) {
  const IconButton = ({
    children,
    onClick,
    disabled,
    tooltipText,
    variant = "ghost",
    className,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    tooltipText: string;
    variant?: "ghost" | "link";
    className?: string;
  }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={variant}
            size="icon"
            onClick={onClick}
            disabled={disabled}
            className={cn(
              "transition-all duration-200 hover:scale-110",
              disabled && "opacity-50 hover:scale-100",
              className
            )}
          >
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  const Separator = () => (
    <div className="h-10 w-px bg-border" />
  );

  return (
    <div className="fixed bottom-8 flex items-center justify-center gap-3 min-w-[300px] h-[60px] bg-background border rounded-full shadow-sm px-8">
      <Link to="/dashboard/folders">
        <IconButton tooltipText="Retour aux dossiers">
          <Folder className="h-5 w-5" />
        </IconButton>
      </Link>
      
      <Separator />

      <IconButton
        onClick={() => {
          setCurrentIndex((prev) => prev - 1);
          setShowAnswer(false);
        }}
        disabled={currentIndex === 0}
        tooltipText="Précédente"
      >
        <ArrowLeft className="h-5 w-5" />
      </IconButton>

      <IconButton
        onClick={() => {
          setCurrentIndex((prev) => prev + 1);
          setShowAnswer(false);
        }}
        disabled={currentIndex === flashcards.length}
        tooltipText="Suivante"
      >
        <ArrowRight className="h-5 w-5" />
      </IconButton>

      <IconButton
        onClick={() => {
          setCurrentIndex(0);
          setShowAnswer(false);
        }}
        disabled={currentIndex === 0}
        tooltipText="Recommencer"
        className="hover:text-orange-500"
      >
        <RotateCcw className="h-5 w-5 transition-transform duration-700 hover:rotate-[-360deg]" />
      </IconButton>

      <Separator />

      <IconButton
        onClick={handleShuffle}
        tooltipText="Mélanger"
      >
        <Shuffle className="h-5 w-5" />
      </IconButton>

      {flashcards[0]?.ia_generated ? (
        <Link to={`/dashboard/folders/${deckId}/quiz`}>
          <IconButton tooltipText="Mode quiz">
            <FileQuestion className="h-5 w-5" />
          </IconButton>
        </Link>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          disabled
          className="opacity-50 cursor-not-allowed"
        >
          <FileQuestion className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}
