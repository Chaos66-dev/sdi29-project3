import { useState, useEffect, useContext } from "react";
import { IconButton, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeContext } from '../../context/ThemeContext.jsx';

export function ThemeToggle() {
    const theme = useTheme();
    const colorMode = useContext(ThemeContext);

    return (
        <IconButton
            onClick={colorMode.toggleColorMode}
            color="inherit"
            sx={{ ml: 1 }}
        >
            {theme.palette.mode === 'dark' ? (
                <Brightness7Icon />
            ) : (
                <Brightness4Icon />
            )}
        </IconButton>
    );
}