import { css } from 'styled-components';

const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
};

export const textVariants = {
  heading: css`
    font-weight: 600;
    color: #0b0b0b;
    @media screen and (max-width: ${breakpoints.tablet}) {
      font-size: 1.5rem !important;
    }

    @media screen and (min-width: ${breakpoints.tablet}) {
      font-size: 2rem !important;
    }
    @media screen and (min-width: ${breakpoints.desktop}) {
      font-size: 2.5rem !important;
    }
  `,
  subheading: css`
    font-size: 1rem;
    font-weight: 400;
    color: #9a9a9a !important;

    @media screen and (min-width: ${breakpoints.mobile}) {
      font-size: 1.25rem;
    }

    @media screen and (min-width: ${breakpoints.tablet}) {
      font-size: 1.5rem;
    }
  `,
  body: css`
    font-size: 0.875rem;
    font-weight: 400;
    color: #7b7b7b;

    @media screen and (min-width: ${breakpoints.mobile}) {
      font-size: 1rem;
    }
  `,
  caption: css`
    font-size: 0.75rem;
    font-weight: 300;
    color: #999;

    @media screen and (min-width: ${breakpoints.mobile}) {
      font-size: 0.875rem;
    }
  `,
  cta: css`
    font-size: 0.75rem;
    color: #0177ff;
  `,
};
