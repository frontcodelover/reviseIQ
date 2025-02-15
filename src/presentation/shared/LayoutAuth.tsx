import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const Container = styled(Box)`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  --dot-bg: #007868;
  --dot-color: #fff;
  --dot-size: 1px;
  --dot-space: 50px;
  background:
    linear-gradient(90deg, var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%)
      center / var(--dot-space) var(--dot-space),
    linear-gradient(var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center /
      var(--dot-space) var(--dot-space),
    var(--dot-color);
  margin: 0 auto;
`;

interface LayoutAuthProps {
  children: React.ReactNode;
}

const LayoutAuth: React.FC<LayoutAuthProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default LayoutAuth;
