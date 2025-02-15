import { ColorPickerProps } from '@/domain/entities/User';
import clsx from 'clsx';
import { Check } from 'lucide-react';
import React from 'react';

// Fonction utilitaire pour convertir une couleur hexadécimale en rgba avec une opacité
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onSelectColor, colors }) => {
  return (
    <div className="flex gap-1">
      {colors.map((color) => (
        <div
          key={color}
          className={clsx(
            'relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full shadow-inner',
            selectedColor === color ? 'shadow-lg' : ''
          )}
          style={{
            backgroundColor: color,
            borderColor: hexToRgba(color, 0.7),
            borderWidth: '2px',
          }}
          onClick={() => onSelectColor(color)}
        >
          {selectedColor === color && <Check className="text-white" />}
        </div>
      ))}
    </div>
  );
};

export default ColorPicker;
