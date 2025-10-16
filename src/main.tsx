import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider, createTheme } from '@mantine/core'
import App from './App.tsx'
import './index.css'

const theme = createTheme({
    primaryColor: 'green',
    colors: {
        green: [
            '#eafbee',
            '#dbf2e0',
            '#b9e1c2',
            '#94d0a1',
            '#74c186',
            '#60b874',
            '#54b46a',
            '#449e59',
            '#398d4d',
            '#2a7a3f'
        ],
    },
    fontFamily: 'Open Sans, Inter, sans-serif',
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider theme={theme}>
            <App />
        </MantineProvider>
    </React.StrictMode>,
)