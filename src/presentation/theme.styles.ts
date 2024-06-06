const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const theme = {
  spacing: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '32px',
    8: '40px',
    9: '48px',
    10: '64px',
    11: '128px',
  },
  font: {
    light: 'RobotoLight',
    regular: 'RobotoRegular',
    medium: 'RobotoMedium',
    bold: 'RobotoBold',
    black: 'RobotoBlack',
  },
  colors: {
    light: {
      gray: {
        800: '#4F4F4F',
        700: '#3D3D3D',
        600: '#454545',
        500: '#888888',
        400: '#B0B0B0',
        300: '#E7E7E7',
      },
      pink: {
        500: '#FF1259',
        600: '#C21F83',
      },
      red: {
        500: '#EF4848',
      },
      green: {
        500: '#009669',
      },
      white: '#FFFFFF',
    },
    dark: {
      gray: {
        800: '#B0B0B0',
        700: '#888888',
        600: '#4F4F4F',
        500: '#454545',
        400: '#3D3D3D',
        300: '#E7E7E7',
      },
      pink: {
        500: '#C21F83',
        600: '#FF1259',
      },
      red: {
        500: '#EF4848',
      },
      green: {
        500: '#009669',
      },
      black: '#000000',
    },
  },
} as const;

export type AppTheme = {
  spacing: typeof theme.spacing;
  font: typeof theme.font;
  colors: typeof theme.colors.light;
};
