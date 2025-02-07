import { extendTheme } from '@mui/joy/styles';

declare module '@mui/joy/styles' {
  interface ColorPalettePropOverrides {
    pinky: true;
    darkBlue: true;
  }

  interface PaletteRange {
    solidBg: string;
    solidHoverBg: string;
    softBg: string;
    softColor: string;
    plainColor: string;
    outlinedBorder: string;
    outlinedColor: string;
    lightBlue?: string;
    fullDark?: string;
    white?: string;
    fullLight?: string;
  }
  interface Palette {
    pinky: PaletteRange;
    darkBlue: PaletteRange;
  }
}

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: '#488bff',
          solidHoverBg: '#0a6dff',
          solidActiveBg: '#0560fc',
          softBg: '#f9fcff',
          softColor: '#0560fc',
          plainColor: '#0560fc',
          // Pour le selected state des ListItemButton
          outlinedBorder: '#0560fc',
          outlinedColor: '#0560fc',
          white: '#ffffff',
          fullLight: '#edf1f5',
        },
        darkBlue: {
          solidBg: 'hsl(219, 89%, 4%)',
          solidHoverBg: '#020b1b',
          solidActiveBg: '#020b1b',
          softBg: '#020b1b',
          softColor: '#79BCFF',
          plainColor: '#c8e3ff',
          outlinedBorder: '#79BCFF',
          outlinedColor: '#79BCFF',
        },
        pinky: {
          solidBg: '#db0fb6',
          solidHoverBg: '#c00ea2',
          softBg: 'hsla(311, 87%, 46%, 0.22)',
          softColor: '#db0fb6',
          plainColor: '#db0fb6',
          outlinedBorder: '#db0fb6',
          outlinedColor: '#db0fb6',
        },
        neutral: {
          solidBg: '#6d7278',
          solidHoverBg: '#9a9a9a',
          softBg: '#f8f8f8',
          softColor: '#6d7278',
          // Ajout des propriétés manquantes
          plainColor: '#6d7278',
          outlinedBorder: '#D9D9D9',
          outlinedColor: '#6d7278',
        },
        danger: {
          solidBg: '#ff2d55',
          solidHoverBg: '#ff1a47',
          softColor: '#ff2d55',
          softBg: '#ffe5e9',
          plainColor: '#ff2d55',
          outlinedBorder: '#ff2d55',
          outlinedColor: '#ff2d55',
        },
        success: {
          solidBg: '#28a745',
          solidHoverBg: '#218838',
          softColor: '#28a745',
          softBg: '#e8f5e9',
          plainColor: '#28a745',
          outlinedBorder: '#28a745',
          outlinedColor: '#28a745',
        },
        warning: {
          solidBg: '#ffc107',
          solidHoverBg: '#e0a800',
          softBg: '#fff3cd',
          softColor: '#ffc107',
          plainColor: '#ffc107',
          outlinedBorder: '#ffc107',
          outlinedColor: '#ffc107',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          solidBg: '#0a53c9', // Bleu foncé contrasté
          solidHoverBg: '#0c63e3',
          solidActiveBg: '#084298',
          softBg: '#0a192f',
          softColor: '#61dafb',
          plainColor: '#61dafb',
          outlinedBorder: '#05204c',
          outlinedColor: '#61dafb',
          lightBlue: '#e2eaf8',
        },
        darkBlue: {
          fullDark: '#020d18',
          solidBg: '#081b2d', // Bleu très foncé
          solidHoverBg: '#0c243a',
          solidActiveBg: '#071626',
          softBg: '#0c243a',
          softColor: '#90caf9', // Bleu clair pour lisibilité
          plainColor: '#90caf9',
          outlinedBorder: '#284168',
          outlinedColor: '#90caf9',
        },
        pinky: {
          solidBg: '#9a1368', // Rose foncé pour plus de contraste
          solidHoverBg: '#c2185b',
          softBg: 'hsla(311, 87%, 30%, 0.3)', // Plus foncé pour le RGAAA
          softColor: '#f06292',
          plainColor: '#f06292',
          outlinedBorder: '#f06292',
          outlinedColor: '#f06292',
        },
        neutral: {
          solidBg: '#3d3d3d', // Gris sombre
          solidHoverBg: '#575757',
          softBg: '#242424',
          softColor: '#c2c2c2',
          plainColor: '#c2c2c2',
          outlinedBorder: '#8c8c8c',
          outlinedColor: '#c2c2c2',
        },
        danger: {
          solidBg: '#d32f2f',
          solidHoverBg: '#b71c1c',
          softBg: '#4a1212',
          softColor: '#ff6b6b',
          plainColor: '#ff6b6b',
          outlinedBorder: '#ff6b6b',
          outlinedColor: '#ff6b6b',
        },
        success: {
          solidBg: '#2e7d32',
          solidHoverBg: '#1b5e20',
          softBg: '#103d12',
          softColor: '#66bb6a',
          plainColor: '#66bb6a',
          outlinedBorder: '#66bb6a',
          outlinedColor: '#66bb6a',
        },
        warning: {
          solidBg: '#ed6c02',
          solidHoverBg: '#e65100',
          softBg: '#573c14',
          softColor: '#ffa726',
          plainColor: '#ffa726',
          outlinedBorder: '#ffa726',
          outlinedColor: '#ffa726',
        },
      },
    },
  },
});
