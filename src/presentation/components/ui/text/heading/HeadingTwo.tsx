import React from 'react';
import { styled } from 'styled-components';
import { textSizeVariants } from '@/presentation/components/ui/text/TextSize';
import { textAlignVariants } from '@/presentation/components/ui/text/TextAlign';
import { textFontWeightVariants } from '@/presentation/components/ui/text/weight/FontWeight';
import { colorsVariant } from '@/presentation/components/ui/text/TextColors';
import { textDecorationVariants } from '@/presentation/components/ui/text/TextDecoration';

interface HeadingTwoProps extends React.HTMLAttributes<HTMLHeadingElement> {
  $size?: keyof typeof textSizeVariants;
  $align?: keyof typeof textAlignVariants;
  $weight?: keyof typeof textFontWeightVariants;
  $color?: keyof typeof colorsVariant;
  $decoration?: keyof typeof textDecorationVariants;
}

const HeadingTwoConstructor = styled.h2<HeadingTwoProps>`
  ${({ $size }) => $size && textSizeVariants[$size]}
  ${({ $align }) => $align && textAlignVariants[$align]}
  ${({ $weight }) => $weight && textFontWeightVariants[$weight]}
  ${({ $color }) => $color && colorsVariant[$color]}
  ${({ $decoration }) => $decoration && textDecorationVariants[$decoration]}
`;

const HeadingTwo: React.FC<HeadingTwoProps> = ({
  $size,
  $align,
  $weight,
  $color,
  $decoration,
  children,
  ...props
}) => {
  return (
    <HeadingTwoConstructor
      $size={$size}
      $align={$align}
      $weight={$weight}
      $color={$color}
      $decoration={$decoration}
      {...props}
    >
      {children}
    </HeadingTwoConstructor>
  );
};

export default HeadingTwo;
