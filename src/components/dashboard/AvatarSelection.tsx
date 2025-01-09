import { RadioGroup } from '@/components/ui/radio-group';

const AvatarSelect = ({ value, onChange }: AvatarSelectProps) => {
  const avatars = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <RadioGroup
      className="grid grid-cols-4 gap-4"
      value={value}
      onValueChange={onChange}
    >
      {avatars.map((num) => (
        <div
          key={num}
          className={`relative cursor-pointer rounded p-1 ${
            value === `avatar-${num}`
              ? 'bg-indigo-400 ring-2 ring-indigo-400'
              : ''
          }`}
          onClick={() => onChange(`avatar-${num}`)}
        >
          <img
            src={`/src/assets/avatar-${num}.webp`}
            alt={`Avatar ${num}`}
            className="h-16 w-16 rounded p-0"
          />
        </div>
      ))}
    </RadioGroup>
  );
};

export default AvatarSelect;
