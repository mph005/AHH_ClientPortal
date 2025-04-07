import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// Color mode config
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

// Define colors
const colors = {
  brand: {
    50: '#f0f8ff',
    100: '#e1effe',
    200: '#bddafc',
    300: '#8abef7',
    400: '#5aa4f1',
    500: '#358ae3',
    600: '#2670c1',
    700: '#1e569d',
    800: '#1a437a',
    900: '#1a3760',
  },
  accent: {
    50: '#fff8f0',
    100: '#ffefd9',
    200: '#ffd8a8',
    300: '#ffbd70',
    400: '#ffa64d',
    500: '#ff8c24',
    600: '#fc6c03',
    700: '#db5702',
    800: '#ad4400',
    900: '#8a3500',
  },
};

// Define font stacks
const fonts = {
  heading: '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  body: '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
};

// Component specific styles
const components = {
  Button: {
    baseStyle: {
      fontWeight: 'bold',
      borderRadius: 'md',
    },
    variants: {
      primary: {
        bg: 'brand.500',
        color: 'white',
        _hover: {
          bg: 'brand.600',
        },
      },
      secondary: {
        bg: 'accent.500',
        color: 'white',
        _hover: {
          bg: 'accent.600',
        },
      },
      outline: {
        border: '2px solid',
        borderColor: 'brand.500',
        color: 'brand.500',
      },
    },
    defaultProps: {
      variant: 'primary',
    },
  },
};

// Create the theme
const theme = extendTheme({
  config,
  colors,
  fonts,
  components,
});

export default theme; 