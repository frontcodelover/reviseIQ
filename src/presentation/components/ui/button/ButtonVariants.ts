import { css } from 'styled-components';
import { COLORS } from '@/presentation/components/ui/colors/ColorsVariant';

export const buttonVariants = {
  primary: css`
    background-color: ${COLORS.primary};
    color: ${COLORS.white};
    transition: background-color 0.2s;
    &:hover {
      background-color: ${COLORS.primaryHover};
    }
  `,
  secondary: css`
    background-color: ${COLORS.secondary};
    color: ${COLORS.white};
    &:hover {
      background-color: ${COLORS.third};
    }
  `,
  success: css`
    background-color: ${COLORS.success};
    color: ${COLORS.white};
    &:hover {
      background-color: ${COLORS.success}dd;
    }
  `,
  danger: css`
    background-color: ${COLORS.danger};
    color: ${COLORS.white};
    &:hover {
      background-color: ${COLORS.danger}dd;
    }
  `,
  warning: css`
    background-color: ${COLORS.warning};
    color: ${COLORS.black};
    &:hover {
      background-color: ${COLORS.warning}dd;
    }
  `,
  info: css`
    background-color: ${COLORS.info};
    color: ${COLORS.white};
    &:hover {
      background-color: ${COLORS.info}dd;
    }
  `,
};
