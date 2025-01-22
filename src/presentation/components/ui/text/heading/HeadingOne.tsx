import React from 'react';
import { styled } from 'styled-components';
import { textSizeVariants } from '@/presentation/components/ui/text/TextSize';
import { textAlignVariants } from '@/presentation/components/ui/text/TextAlign';
import { textFontWeightVariants } from '../weight/FontWeight';
import { colorsVariant } from '../colors/ColorsVariant';

interface HeadingOneProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: keyof typeof textSizeVariants;
  align?: keyof typeof textAlignVariants;
  weight?: keyof typeof textFontWeightVariants;
  color?: keyof typeof colorsVariant;
}

const HeadingOneConstructor = styled.h1<HeadingOneProps>`
  ${({ size }) => size && textSizeVariants[size]}
  ${({ align }) => align && textAlignVariants[align]}
	${({ weight }) => weight && textFontWeightVariants[weight]}
	${({ color }) => color && colorsVariant[color]}
`;

const HeadingOne: React.FC<HeadingOneProps> = ({
  size,
  align,
  weight,
  color,
  children,
  ...props
}: HeadingOneProps) => {
  return (
    <HeadingOneConstructor size={size} align={align} weight={weight} color={color} {...props}>
      {children}
    </HeadingOneConstructor>
  );
};

export default HeadingOne;
