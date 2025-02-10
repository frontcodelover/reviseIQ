import React from 'react';
import { MuiTelInput } from 'mui-tel-input';

interface PhoneInputProps {
  phoneNumber: string;
  onPhoneChange: (phone: string) => void;
  className?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  phoneNumber,
  onPhoneChange,
  className,
}) => {
  const handleChange = (value: string) => {
    onPhoneChange(value);
  };

  return (
    <MuiTelInput
      value={phoneNumber}
      onChange={handleChange}
      defaultCountry="FR"
      sx={{ width: '100%' }}
      className={className}
    />
  );
};
