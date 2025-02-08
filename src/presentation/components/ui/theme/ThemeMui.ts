import { extendTheme } from '@mui/joy/styles';
import type { PaletteRange } from '@mui/joy/styles';
import '@mui/joy/styles';

declare module '@mui/joy/styles' {
  interface ColorPalettePropOverrides {
    secondary: true;
    info: true;
  }

  interface Palette {
    secondary: PaletteRange;
    info: PaletteRange;
  }

  interface PaletteOptions {
    secondary?: Partial<PaletteRange>;
    info?: Partial<PaletteRange>;
  }
}

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: '#00A76F',
          solidHoverBg: '#007867',
          solidActiveBg: '#004B50',
          softBg: '#C8FAD6',
          softHoverBg: '#5BE49B',
          softActiveBg: '#00A76F',
          plainColor: '#00A76F',
          plainHoverBg: '#C8FAD6',
          plainActiveBg: '#5BE49B',
          outlinedBorder: '#00A76F',
          outlinedColor: '#00A76F',
        },
        secondary: {
          solidBg: '#8E33FF',
          solidHoverBg: '#5119B7',
          solidActiveBg: '#27097A',
          softBg: '#EFD6FF',
          softHoverBg: '#C684FF',
          softActiveBg: '#8E33FF',
          plainColor: '#8E33FF',
          plainHoverBg: '#EFD6FF',
          plainActiveBg: '#C684FF',
          outlinedBorder: '#8E33FF',
          outlinedColor: '#8E33FF',
        },
        info: {
          solidBg: '#00B8D9',
          solidHoverBg: '#006C9C',
          solidActiveBg: '#003768',
          softBg: '#CAFDF5',
          softHoverBg: '#61F3F3',
          softActiveBg: '#00B8D9',
          plainColor: '#00B8D9',
          plainHoverBg: '#CAFDF5',
          plainActiveBg: '#61F3F3',
        },
        success: {
          solidBg: '#22C55E',
          solidHoverBg: '#118D57',
          solidActiveBg: '#065E49',
          softBg: '#D3FCD2',
          softHoverBg: '#77ED8B',
          softActiveBg: '#22C55E',
          plainColor: '#22C55E',
          plainHoverBg: '#D3FCD2',
          plainActiveBg: '#77ED8B',
        },
        warning: {
          solidBg: '#FFAB00',
          solidHoverBg: '#B76E00',
          solidActiveBg: '#7A4100',
          softBg: '#FFF5CC',
          softHoverBg: '#FFD666',
          softActiveBg: '#FFAB00',
          plainColor: '#FFAB00',
          plainHoverBg: '#FFF5CC',
          plainActiveBg: '#FFD666',
        },
        danger: {
          solidBg: '#FF5630',
          solidHoverBg: '#B71D18',
          solidActiveBg: '#7A0916',
          softBg: '#FFE9D5',
          softHoverBg: '#FFAC82',
          softActiveBg: '#FF5630',
          plainColor: '#FF5630',
          plainHoverBg: '#FFE9D5',
          plainActiveBg: '#FFAC82',
        },
        neutral: {
          solidBg: '#919EAB',
          solidHoverBg: '#637381',
          solidActiveBg: '#454F5B',
          plainColor: '#637381',
          plainHoverBg: '#F4F6F8',
          plainActiveBg: '#DFE3E8',
          outlinedBorder: '#919EAB',
          outlinedColor: '#637381',
        },
        background: {
          body: '#FFFFFF',
          surface: '#F9FAFB',
          level1: '#F4F6F8',
          level2: '#DFE3E8',
          level3: '#C4CDD5',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          solidBg: '#5BE49B',
          solidHoverBg: '#00A76F',
          solidActiveBg: '#007867',
          softBg: '#004B50',
          softHoverBg: '#007867',
          softActiveBg: '#00A76F',
          plainColor: '#5BE49B',
          plainHoverBg: '#004B50',
          plainActiveBg: '#007867',
          outlinedBorder: '#5BE49B',
          outlinedColor: '#5BE49B',
        },
        secondary: {
          solidBg: '#C684FF',
          solidHoverBg: '#8E33FF',
          solidActiveBg: '#5119B7',
          softBg: '#27097A',
          softHoverBg: '#5119B7',
          softActiveBg: '#8E33FF',
          plainColor: '#C684FF',
          plainHoverBg: '#27097A',
          plainActiveBg: '#5119B7',
          outlinedBorder: '#C684FF',
          outlinedColor: '#C684FF',
        },
        background: {
          body: '#121212',
          surface: '#1C252E',
          level1: '#454F5B',
          level2: '#637381',
          level3: '#919EAB',
        },
      },
    },
  },
});

export default theme;
