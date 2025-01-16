// src/components/auth/EmailInput.tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { EmailInputProps } from '@/domain/entities/User';

export function EmailInput({ email, onChange, touched, isValid }: EmailInputProps) {
  return (
    <div className="mb-4">
      <Label className="mb-2 block font-medium text-gray-700">Email</Label>
      <Input
        type="email"
        value={email}
        onChange={onChange}
        required
        className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          touched && !isValid ? 'border-red-500' : ''
        }`}
      />
      {touched && !isValid && (
        <p className="mt-1 text-sm text-red-500">Veuillez entrer une adresse email valide</p>
      )}
    </div>
  );
}
