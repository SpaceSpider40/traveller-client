import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css";
import App from './App.tsx'
import {ThemeProvider} from "@emotion/react";
import {createTheme, CssBaseline} from "@mui/material";

const theme = createTheme({
    // palette: {
    //     primary: {
    //         main: '#d50000'
    //     },
    //     secondary: {
    //         main: '#ef5350'
    //     }
    // },
    palette: {
        mode: 'dark'
    },
    typography: {
        fontFamily: [
            'Noto Sans',
        ].join(','),
    },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
      </ThemeProvider>
  </StrictMode>,
)
