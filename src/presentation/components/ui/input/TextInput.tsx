// src/presentation/components/ui/Input.tsx
import React from 'react';
import styled from 'styled-components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const StyledInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #0077ff;
  }
`;

const StyledLabel = styled.label`
  margin-bottom: 0.5rem;
  display: block;
  font-weight: 500;
  color: #4a5568;
`;

const TextInput: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <>
      {label && <StyledLabel>{label}</StyledLabel>}
      <StyledInput {...props} />
    </>
  );
};

export default TextInput;
