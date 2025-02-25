import { cn } from '@/lib/utils';
import PhoneInput2 from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface PhoneInputProps {
  phoneNumber: string;
  onPhoneChange: (phone: string) => void;
  className?: string;
}

export function PhoneInput({ phoneNumber, onPhoneChange, className }: PhoneInputProps) {
  return (
    <div className={cn('relative', className)}>
      <PhoneInput2
        country="fr"
        value={phoneNumber}
        onChange={onPhoneChange}
        inputClass={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
          'ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'placeholder:text-muted-foreground focus-visible:outline-none',
          'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'dark:text-foreground dark:bg-background'
        )}
        containerClass="w-full"
        buttonClass={cn(
          'absolute left-0 top-0 bottom-0 flex items-center justify-center',
          'px-3 border-r border-input bg-muted',
          'dark:bg-muted dark:border-input'
        )}
        dropdownClass={cn(
          'absolute z-50 mt-1 max-h-[200px] w-full overflow-auto rounded-md',
          'border border-input bg-popover text-popover-foreground shadow-md',
          'dark:bg-popover dark:text-popover-foreground dark:border-input'
        )}
        searchClass="dark:bg-background dark:text-foreground"
        inputStyle={{
          backgroundColor: 'transparent',
          borderColor: 'hsl(var(--input))',
          borderWidth: '1px',
        }}
        buttonStyle={{
          border: 'none',
          borderRight: '1px solid hsl(var(--input))',
        }}
      />
    </div>
  );
}
