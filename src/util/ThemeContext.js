import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const lightTheme = {
    colors: {
      primary: '#FFFFFF',
      secondary: '#cccec67d',
      background: '#F8F9FA',
      text: '#333',
    },
    typography: {
      fontFamily: 'Roboto',
      fontSize: {
        small: '14px',
        medium: '16px',
        large: '18px',
      },
    },
    spacing: {
      small: '8px',
      medium: '16px',
      large: '24px',
    },
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const darkTheme = {
    colors: {
      primary: '#0A84FF',
      secondary: '#CCCCCC',
      background: '#333333',
      text: '#FFFFFF',
    },
    typography: {
      fontFamily: 'Roboto',
      fontSize: {
        small: '14px',
        medium: '16px',
        large: '18px',
      },
    },
    spacing: {
      small: '8px',
      medium: '16px',
      large: '24px',
    },
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const [theme, setTheme] = useState(lightTheme); // Default to light theme

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
