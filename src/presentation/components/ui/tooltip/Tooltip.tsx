import { ReactNode } from 'react';
import styled from 'styled-components';

const TooltipContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  &:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
  }
`;

const TooltipText = styled.div`
  visibility: hidden;
  font-size: 0.8rem;
  opacity: 0;
  transition: opacity 0.2s;
  position: absolute;
  width: max-content;
  background-color: #333;
  color: #fff;
  padding: 0.4rem;
  border-radius: 4px;
  top: -45px;
  left: 50%;
  transform: translateX(-50%);
`;

function Tooltip({
  children,
  text,
  disabled,
}: {
  children: ReactNode;
  text: string;
  disabled?: boolean;
}) {
  if (disabled) {
    return <>{children}</>;
  }
  return (
    <TooltipContainer>
      {children}
      <TooltipText className="tooltip-text">{text}</TooltipText>
    </TooltipContainer>
  );
}

export default Tooltip;
