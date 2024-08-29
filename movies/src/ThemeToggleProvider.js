import React, { useState, useEffect, createContext, useContext } from "react";
import Switch from "@mui/material/Switch";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Brightness2, Brightness7 } from "@mui/icons-material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

// Create a context for theme toggle
const ThemeToggleContext = createContext();

export const useThemeToggle = () => useContext(ThemeToggleContext);

const ThemeToggleProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    setDarkMode(savedTheme === "true");
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#121212" : "#ffffff",
      },
    },
  });

  return (
    <ThemeToggleContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};

export default ThemeToggleProvider;
