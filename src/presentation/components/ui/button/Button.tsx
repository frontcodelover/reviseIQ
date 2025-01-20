// src/components/ui/Button/Button.tsx
import React from 'react';
import styled from 'styled-components';
import { buttonVariants } from '@/presentation/components/ui/button/ButtonVariants';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: keyof typeof buttonVariants;
}

const StyledButton = styled.button<ButtonProps>`
  padding: 0.75rem 1.5rem;
  font-size: 16px;
  font-weight: 300;
  border-radius: 0.5rem;
  cursor: pointer;

  ${({ variant }) => buttonVariants[variant]}

  &.loading {
    cursor: not-allowed;
    background-color: #93c5fd;
  }
`;

const Button: React.FC<ButtonProps> = ({ variant, children, ...props }) => {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
