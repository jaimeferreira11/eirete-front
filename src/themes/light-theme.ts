import { createTheme } from '@mui/material/styles';

let lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#F5B223',
    },
    secondary: {
      main: '#2366f5',
    },
    error: {
      main: '#f44336',
    },
    success: {
      main: '#59AF25',
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: 'fixed',
      },
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          height: 60,
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 30,
          fontWeight: 600,
        },
        h2: {
          fontSize: 20,
          fontWeight: 400,
        },
        h4: {
          fontSize: 10,
          fontWeight: 400,
        },
        h5: {
          fontSize: 20,
          fontWeight: 400,
        },
        body1: { fontSize: 14 },
        body2: { fontSize: 14 },
        subtitle1: {
          fontSize: 18,
          fontWeight: 600,
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            border: `0.5px solid #fff`,
            backgroundColor: '#F5B223',
            color: '#fff',
            '& *': {
              fontWeight: 800,
            },
            fontSize: 18,
            '&&:hover': {
              color: '#141414',
              backgroundColor: '#FEEFC3',
              transition: 'all 0.4s ease-in-out',
              '& *': {
                color: '#141414',
                fontWeight: 500,
                transition: 'all 0.1s ease-in-out',
              },
            },
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'small',
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          padding: '8px 16px',
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: 10,
          ':hover': {
            backgroundColor: '#FEEFC3',
            transition: 'all 0.3s ease-in-out',
          },
        },
      },
    },

    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
          borderRadius: '10px',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
  },
});

// lightTheme = responsiveFontSizes(lightTheme);

export default lightTheme;
