

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
    }
})


export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#121212',
    }, 
    }
 })