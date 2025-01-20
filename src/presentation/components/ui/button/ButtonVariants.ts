// src/styles/ButtonVariants.js
import { css } from 'styled-components';

export const buttonVariants = {
  primary: css`
    background-color: #0077FF;
    color: white;
    transition: background-color 0.2s;
    &:hover {
      background-color: #0056b3;
    }
  `,
  secondary: css`
    background-color: #6c757d;
    &:hover {
      background-color: #5a6268;
    }
  `,
  success: css`
    background-color: #28a745;
    &:hover {
      background-color: #218838;
    }
  `,
  danger: css`
    background-color: #dc3545;
    &:hover {
      background-color: #c82333;
    }
  `,
};