import { Button } from '@/presentation/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/presentation/components/ui/tooltip';
import cn from 'classnames';
import React from 'react';

export const IconButton = ({
  children,
  onClick,
  disabled,
  tooltipText,
  variant = 'ghost',
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  tooltipText: string;
  variant?: 'ghost' | 'link';
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
            'transition-all duration-200 hover:scale-110',
            disabled && 'opacity-50 hover:scale-100',
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
