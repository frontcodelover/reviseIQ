import React, { ChangeEvent } from 'react';
import { RadioGroup, RadioGroupProps } from '@mui/material';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';

interface AvatarSelectProps extends Omit<RadioGroupProps, 'children'> {
  onChange: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
}

const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  '.MuiSvgIcon-root': {
    width: 50,
    height: 50,
  },
}));

export const AvatarSelect: React.FC<AvatarSelectProps> = ({ value, onChange }) => {
  const avatars = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <RadioGroup
      row
      aria-label="avatars"
      name="row-radio-buttons-group"
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, e.target.value)}
    >
      {avatars.map((num) => (
        <StyledFormControlLabel
          key={num}
          value={`avatar-${num}`}
          control={<Radio />}
          label={
            <img
              src={`/src/assets/avatar-${num}.webp`}
              alt={`Avatar ${num}`}
              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            />
          }
        />
      ))}
    </RadioGroup>
  );
};
