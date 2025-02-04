import React from 'react';
import { styled } from 'styled-components';
import { textSizeVariants } from '@/presentation/components/ui/text/TextSize';
import { textAlignVariants } from '@/presentation/components/ui/text/TextAlign';
import { textFontWeightVariants } from '@/presentation/components/ui/text/weight/FontWeight';
import { colorsVariant } from '@/presentation/components/ui/text/TextColors';
import { textDecorationVariants } from '@/presentation/components/ui/text/TextDecoration';

interface HeadingOneProps extends React.HTMLAttributes<HTMLHeadingElement> {
  $size?: keyof typeof textSizeVariants;
  $align?: keyof typeof textAlignVariants;
  $weight?: keyof typeof textFontWeightVariants;
  $color?: keyof typeof colorsVariant;
  $decoration?: keyof typeof textDecorationVariants;
}

const HeadingOneConstructor = styled.h1<HeadingOneProps>`
  ${({ $size }) => $size && textSizeVariants[$size]}
  ${({ $align }) => $align && textAlignVariants[$align]}
  ${({ $weight }) => $weight && textFontWeightVariants[$weight]}
  ${({ $color }) => $color && colorsVariant[$color]}
  ${({ $decoration }) => $decoration && textDecorationVariants[$decoration]}
`;

const HeadingOne: React.FC<HeadingOneProps> = ({
  $size,
  $align,
  $weight,
  $color,
  $decoration,
  children,
  ...props
}) => {
  return (
    <HeadingOneConstructor
      $size={$size}
      $align={$align}
      $weight={$weight}
      $color={$color}
      $decoration={$decoration}
      {...props}
    >
      {children}
    </HeadingOneConstructor>
  );
};

export default HeadingOne;
