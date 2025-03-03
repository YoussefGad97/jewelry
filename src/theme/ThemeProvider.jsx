import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#40E0D0', // Turquoise Blue
      light: '#80F0E8',
      dark: '#00A89C',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#FF6B6B', // Coral Accent
      light: '#FF9E9E',
      dark: '#FF3B3B',
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#F8F9FA', // Light Gray
      paper: '#FFFFFF'
    },
    text: {
      primary: '#2A2B2A', // Dark Charcoal
      secondary: '#666666' // Medium Gray
    },
    success: {
      main: '#4CAF50'
    },
    error: {
      main: '#FF6B6B' // Matching secondary
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          '&.active': {
            backgroundColor: '#40E0D0',
            color: '#FFFFFF'
          }
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)'
        },
      },
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 600,
    },
    h3: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 500,
    },
    button: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 500,
    },
  },
});

export default function CustomThemeProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
} 