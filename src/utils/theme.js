

import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#fafafafa',
        },        
        text: {
            primary: '#000000',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
            `,
        },
    }
})

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#121212',
        }, 
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                input {
                    color: #000000; 
                }
            `,
        },
    }
});