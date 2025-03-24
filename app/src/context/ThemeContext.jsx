import React, { createContext, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { getCookie, setCookie } from '../utils/cookies.js';

export const ThemeContext = createContext({
    toggleColorMode: () => { },
});

export function ToggleThemeProvider({ children }) {
    const [mode, setMode] = useState(getCookie('THEME') ?? 'dark');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    const newMode = prevMode === 'light' ? 'dark' : 'light';
                    setCookie('THEME', newMode, 30);
                    return newMode;
                })
            },
        }),
        [],
    );

    const theme = useMemo(
        () => (mode === 'light' ? lightTheme : darkTheme),
        [mode],
    );

    return (
        <ThemeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',  // Classic Material blue
        },
        secondary: {
            main: '#9c27b0',  // Material purple
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.6)',
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',  // Light blue
        },
        secondary: {
            main: '#f48fb1',  // Pink
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
        text: {
            primary: '#ffffff',
            secondary: 'rgba(255, 255, 255, 0.7)',
        },
    },
});