import React from 'react';
import styled from 'styled-components';
import { textVariants } from './TextVariants';

interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: keyof typeof textVariants;
}

const StyledText = styled.div<TextProps>`
  ${({ variant }) => textVariants[variant]}
`;

const Text: React.FC<TextProps> = ({ variant, children, ...props }) => {
  return (
    <StyledText variant={variant} {...props}>
      {children}
    </StyledText>
  );
};

export default Text;
