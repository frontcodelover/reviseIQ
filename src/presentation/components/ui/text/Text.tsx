import React from 'react';
import styled from 'styled-components';
import { textAlignVariants } from '@/presentation/components/ui/text/TextAlign';
import { textSizeVariants } from '@/presentation/components/ui/text/TextSize';
import { textFontWeightVariants } from '@/presentation/components/ui/text/weight/FontWeight';
import { colorsVariant } from '@/presentation/components/ui/text/colors/ColorsVariant';

interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: keyof typeof textAlignVariants;
  size?: keyof typeof textSizeVariants;
  weight?: keyof typeof textFontWeightVariants;
  color?: keyof typeof colorsVariant;
}

const StyledText = styled.div<TextProps>`
  ${({ align }) => align && textAlignVariants[align]}
  ${({ size }) => size && textSizeVariants[size]}
	${({ weight }) => weight && textFontWeightVariants[weight]}
	${({ color }) => color && colorsVariant[color]}
`;

const Text: React.FC<TextProps> = ({ align, size, weight, children, color, ...props }) => {
  return (
    <StyledText align={align} size={size} weight={weight} color={color} {...props}>
      {children}
    </StyledText>
  );
};

export default Text;
