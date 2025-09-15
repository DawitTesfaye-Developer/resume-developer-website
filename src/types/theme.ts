export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    textSecondary: string;
    background: string;
    surface: string;
    border: string;
  };
  gradients: {
    header: string;
    background: string;
  };
}

export interface BackgroundOption {
  id: string;
  name: string;
  type: 'color' | 'gradient' | 'image';
  value: string;
  preview: string;
}

export interface CustomTheme {
  colors: Theme['colors'];
  background: BackgroundOption;
  headerStyle: 'solid' | 'gradient';
}