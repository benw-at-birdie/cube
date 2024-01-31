import './fonts.css'; 

const theme = {
  colors: {
    grey: '#A1A1B5',
    lightBlue: '#F3F3FB',
    purple: '#43436B',
    darkPurple: '#141446',
    red: '#FF6492',
  },
  typography: {
    fontFamily: [
      'Circular-Std',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
  },
  palette: {
    primary: {
      main: 'rgb(173, 187, 219)',
    },
    secondary: {
      main: 'rgb(221, 225, 231)',
    }
  }
};

export default theme;
