import React from 'react';
import styled from 'styled-components';
import { textAlignVariants } from '@/presentation/components/ui/text/TextAlign';
import { textSizeVariants } from '@/presentation/components/ui/text/TextSize';
import { textFontWeightVariants } from '@/presentation/components/ui/text/weight/FontWeight';
import { colorsVariant } from '@/presentation/components/ui/text/TextColors';
import { textFontVariants } from '@/presentation/components/ui/text/TextFont';

interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: keyof typeof textAlignVariants;
  size?: keyof typeof textSizeVariants;
  weight?: keyof typeof textFontWeightVariants;
  color?: keyof typeof colorsVariant;
  font?: keyof typeof textFontVariants;
}

const StyledText = styled.div<TextProps>`
  ${({ align }) => align && textAlignVariants[align]}
  ${({ size }) => size && textSizeVariants[size]}
	${({ weight }) => weight && textFontWeightVariants[weight]}
	${({ color }) => color && colorsVariant[color]}
	${({ font }) => font && textFontVariants[font]}
`;

const Text: React.FC<TextProps> = ({ align, size, weight, children, font, color, ...props }) => {
  return (
    <StyledText align={align} size={size} weight={weight} color={color} font={font} {...props}>
      {children}
    </StyledText>
  );
};

export default Text;
