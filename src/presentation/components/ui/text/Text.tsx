import React from 'react';
import styled from 'styled-components';
import { textAlignVariants } from '@/presentation/components/ui/text/TextAlign';
import { textSizeVariants } from '@/presentation/components/ui/text/TextSize';
import { textFontWeightVariants } from '@/presentation/components/ui/text/weight/FontWeight';
import { colorsVariant } from '@/presentation/components/ui/text/TextColors';
import { textFontVariants } from '@/presentation/components/ui/text/TextFont';
import { textDecorationVariants } from '@/presentation/components/ui/text/TextDecoration';

interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
  $align?: keyof typeof textAlignVariants;
  $size?: keyof typeof textSizeVariants;
  $weight?: keyof typeof textFontWeightVariants;
  $color?: keyof typeof colorsVariant;
  $font?: keyof typeof textFontVariants;
  $decoration?: keyof typeof textDecorationVariants;
}

const StyledText = styled.div<TextProps>`
  ${({ $align }) => $align && textAlignVariants[$align]}
  ${({ $size }) => $size && textSizeVariants[$size]}
	${({ $weight }) => $weight && textFontWeightVariants[$weight]}
	${({ $color }) => $color && colorsVariant[$color]}
	${({ $font }) => $font && textFontVariants[$font]}
	${({ $decoration }) => $decoration && textDecorationVariants[$decoration]}
`;

const Text: React.FC<TextProps> = ({
  $align,
  $size,
  $weight,
  children,
  $font,
  $color,
  $decoration,
  ...props
}) => {
  return (
    <StyledText
      $align={$align}
      $size={$size}
      $weight={$weight}
      $color={$color}
      $font={$font}
      $decoration={$decoration}
      {...props}
    >
      {children}
    </StyledText>
  );
};

export default Text;
