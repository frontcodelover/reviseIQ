import { MuiTelInput } from 'mui-tel-input';
import React from 'react';

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
