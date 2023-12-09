import { extendTheme } from '@chakra-ui/react';
import Avatar from './componentThemes/Avatar';

const colors = Object.freeze({
  primary: {
    50: '#ebf6f6',
    100: '#c1e2e3',
    200: '#a3d5d6',
    300: '#7ac1c3',
    400: '#60b5b7',
    500: '#38a3a5',
    600: '#339496',
    700: '#287475',
    800: '#1f5a5b',
    900: '#184445'
  },
  secondary: {
    50: '#eefaf5',
    100: '#cbefdf',
    200: '#b2e8d0',
    300: '#8eddbb',
    400: '#79d6ad',
    500: '#57cc99',
    600: '#4fba8b',
    700: '#3e916d',
    800: '#307054',
    900: '#255640'
  },
  white: {
    main: '#ffffff',
    400: "#898A8D",
    500: '#F7F7F7',
    600: '#e8e8e8',
    700: '#b5b5b5',
    800: '#8c8c8c',
    900: '#6b6b6b'
  },
  text: {
    50: '#e6e6e6',
    100: '#b0b0b0',
    200: '#8a8a8a',
    300: '#545454',
    400: '#333333',
    black: '#000000'
  }
});

const fontSizes = Object.freeze({
  xs: '12px',
  sm: '14px',
  base: '16px',
  lg: '18px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '30px',
  '4xl': '36px',
  '5xl': '48px',
  '6xl': '60px',
  '7xl': '72px',
  '8xl': '96px',
  '9xl': '128px'
});

const fontWeights = Object.freeze({
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700
});

const breakpoints = Object.freeze({
  '2xs': '320px', //@media(min-width:320px)
  xs: '375px', //@media(min-width:375px)
  sm: '530px', //@media(min-width:480px)
  md: '840px', //@media(min-width:770px)
  lg: '1024px', //@media(min-width:1024px)
  xl: '1200px', //@media(min-width:1200px)
  '2xl': '1600px', //@media(min-width:1600px)
  '3xl': '1900px' //@media(min-width:1900px)
});

const styles = Object.freeze({
  global: {
    html: {
      fontSize: '62.5%'
    },
    body: {
      fontFamily: 'Montserrat, sans-serif',
      color: '#000',
      backgroundColor: '#fff',
      fontSize: '1.6rem',
      lineHeight: '1.6',
      fontWeight: '500'
    },
    '*, *::before, *::after': {
      margin: '0',
      padding: '0',
      boxSizing: 'border-box'
    }
  }
});

export default extendTheme({
  breakpoints,
  colors,
  styles,
  fontWeights,
  fontSizes,
  components: { Avatar }
});
