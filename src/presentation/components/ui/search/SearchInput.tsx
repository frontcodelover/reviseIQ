import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 300;
  border-radius: 32px;
  border: 1px solid #e5e7eb;
  outline: none;
  transition: border-color 0.2s;
  border: 1px solid #ccc; /* Ajoutez la bordure si nécessaire */
  padding-left: 3rem;

  &:focus {
    border-color: #0077ff;
  }
`;

const SearchInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <StyledInput {...props} />;
};

export default SearchInput;
