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
          fontSize: 23,
          fontWeight: 500,
        },
        h2: {
          fontSize: 20,
          fontWeight: 400,
        },
        h4: {
          fontSize: 18,
          fontWeight: 400,
        },
        h5: {
          fontSize: 16,
          fontWeight: 400,
        },
        body1: { fontSize: 14 },
        body2: { fontSize: 14 },
        subtitle1: {
          fontSize: 13,
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          margin: '0px 5px',
          borderRadius: '8px',
          '&.Mui-selected': {
            border: `1px solid #F9DC9D`,
            backgroundColor: '#FFF9ED',
            color: '#F0A70A',

            '& *': {
              fontWeight: 800,
              color: '#F0A70A',
            },
            fontSize: 18,
            '&&:hover': {
              color: '#141414',
              backgroundColor: '#FEEFC3',
              transition: 'all 0.4s ease-in-out',
              '& *': {
                fontWeight: 500,
                transition: 'all 0.1s ease-in-out',
              },
            },
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          color: '#121212',
          margin: '0px 5px',
          borderRadius: '8px',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTabs-indicator': {
            display: 'none',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          indicator: {
            display: 'none',
          },
          background: '#FFFFFF',
          borderWidth: '1px 1px 1px 1px',
          borderStyle: 'solid',
          borderColor: '#EAEAEA',
          borderRadius: '8px 8px 8px 8px',
          marginBottom: '10px',
          minWidth: '11vw',
          maxHeight: '7vh',
          minHeight: '6vh',
          textTransform: 'capitalize',
          '&.Mui-selected': {
            border: `1px solid #F9DC9D`,
            backgroundColor: '#FFF9ED',
            color: '#F0A70A',

            '& *': {
              fontWeight: 800,
              color: '#F0A70A',
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
          color: '#FFFFFF',
          ':hover': {
            backgroundColor: '#FEEFC3',
            color: '#F0A70A',
            transition: 'all 0.3s ease-in-out',
          },
        },
      },
      variants: [
        {
          props: { variant: 'outlined', color: 'primary' },
          style: {
            color: '#F0A70A',
          },
        },
        {
          props: { color: 'success' },
          style: {
            ':hover': {
              backgroundColor: '#59af25ad',
              color: '#FFFFFF',
              transition: 'all 0.3s ease-in-out',
            },
          },
        },
        {
          props: { color: 'error' },
          style: {
            ':hover': {
              backgroundColor: '#f44336ad',
              color: '#FFFFFF',
              transition: 'all 0.3s ease-in-out',
            },
          },
        },
      ],
    },
    MuiIconButton: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: '#F3F3F3',
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
        autoComplete: 'off',
      },
      styleOverrides: {
        root: {},
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        size: 'small',
        autoComplete: false,
      },
      styleOverrides: {
        root: {},
      },
    },
  },
});

// lightTheme = responsiveFontSizes(lightTheme);

export default lightTheme;
