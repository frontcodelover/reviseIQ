import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
  margin: 0 auto;
`;

function LayoutAuth({ children }: { children: React.ReactNode }) {
  return <Container>{children}</Container>;
}

export default LayoutAuth;
