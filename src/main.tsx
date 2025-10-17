import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider, createTheme } from '@mantine/core'
import App from './App.tsx'
import './index.css'

const theme = createTheme({
    primaryColor: 'green',
    colors: {
        green: [
            '#eafbee', // 0: #E7FAEB (secondary default)
            '#dbf2e0', // 1: #D6F0DC (secondary hover)
            '#b9e1c2',
            '#94d0a1',
            '#74c186',
            '#60b874',
            '#54b46a', // 6: основной зеленый (primary default)
            '#449e59',
            '#3b944e', // 8: primary hover
            '#2a7a3f'
        ],
        gray: [
            '#FFFFFF', // white
            '#F7F7F7', // фон логотипа
            '#F1F3F5', // extra light gray
            '#E9ECEF', // very light gray
            '#DEE2E6', // фон кнопок степпера
            '#CED4DA', // medium light gray
            '#ADB5BD', // medium gray
            '#868E96', // для badge color
            '#495057', // dark gray
            '#343A40', // very dark gray
            '#212529', // цвет текста
        ]
    },
    fontFamily: 'Open Sans, Inter, sans-serif',
    components: {
        ActionIcon: {
            defaultProps: {
                variant: 'light',
                size: '30px',
            },
            styles: {
                root: {
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    backgroundColor: '#DEE2E6',
                    border: 'none',
                    '&:hover': {
                        backgroundColor: '#CED4DA',
                    }
                }
            }
        },
        Badge: {
            defaultProps: {
                variant: 'light',
            },
            styles: (theme: any, params: { variant?: string }) => ({
                root: {
                    width: '30px',
                    height: '30px',
                    borderRadius: '36px',
                    padding: '3px 9px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // Style="default"
                    ...(params.variant === 'default' && {
                        backgroundColor: theme.colors.gray[1],
                        fontSize: '14px',
                        fontWeight: 600,
                        fontFamily: 'Open Sans',
                        lineHeight: '20px',
                        color: theme.colors.gray[3],
                    }),
                    // Style="default" но маленький
                    ...(params.variant === 'small' && {
                        backgroundColor: theme.white,
                        color: theme.colors.green[6],
                        width: '20px',
                        height: '20px',
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '36px',
                        border: 'none',
                        minWidth: '20px',
                        gap: '9px',
                        padding: '3px 9px',
                    }),
                    // Style="clear" (по умолчанию)
                    ...(params.variant === 'light' && {
                        backgroundColor: 'transparent',
                        fontSize: '16px',
                        fontWeight: 400,
                        fontFamily: 'Inter',
                        lineHeight: '24px',
                        color: theme.colors.gray[3],
                    }),
                    // Style="color"
                    ...(params.variant === 'filled' && {
                        backgroundColor: theme.colors.gray[2],
                        fontSize: '16px',
                        fontWeight: 400,
                        fontFamily: 'Inter',
                        lineHeight: '24px',
                        color: theme.white,
                    })
                }
            })
        },
        Button: {
            defaultProps: {
                variant: 'filled',
            },
            styles: (theme: any, params: { variant?: string }) => ({
                root: {
                    width: '207px',
                    height: '44px',
                    borderRadius: '8px',
                    border: 'none',
                    padding: '10px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: '16px',
                    lineHeight: '24px',
                    // Primary Button
                    ...(params.variant === 'filled' && {
                        backgroundColor: theme.colors.green[6], // #54b46a
                        color: theme.white,
                        '&:hover': {
                            backgroundColor: theme.colors.green[8], // #3b944e
                        }
                    }),
                    // Secondary Button
                    ...(params.variant === 'light' && {
                        backgroundColor: theme.colors.green[0], // #eafbee (#E7FAEB)
                        color: theme.colors.green[8], // #3b944e
                        '&:hover': {
                            backgroundColor: theme.colors.green[1], // #dbf2e0 (#D6F0DC)
                        }
                    })
                }
            })
        },
        Card: {
            defaultProps: {
                padding: '16px',
                withBorder: false,
            },
            styles: (theme: any, params: { variant?: string }) => ({
                root: {
                    width: '302px',
                    height: '414px',
                    borderRadius: '24px',
                    backgroundColor: theme.white,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    // State="Default"
                    ...(params.variant === 'default' && {
                        boxShadow: 'none',
                    }),
                    // State="Hover"
                    ...(params.variant === 'hover' && {
                        boxShadow: '0px 2px 8px 0px #21252914, 0px 1px 2px 0px #2125291A',
                        '&:hover': {
                            boxShadow: '0px 4px 12px 0px #2125291A',
                        }
                    }),
                    // State="Loading"
                    ...(params.variant === 'loading' && {
                        boxShadow: '0px 2px 8px 0px #21252914, 0px 1px 2px 0px #2125291A',
                        height: '412px',
                    })
                }
            })
        },

        Image: {
            styles: {
                root: {
                    width: '276px',
                    height: '276px',
                    borderRadius: '8px',
                    margin: '16px 10px 0 16px'
                }
            }
        },

        Text: {
            defaultProps: {
                variant: 'default',
            },
            styles: (theme: any, params: { variant?: string }) => ({
                root: {
                    // Стиль для названия товара
                    ...(params.variant === 'productName' && {
                        fontFamily: 'Inter',
                        fontWeight: 600,
                        fontSize: '18px',
                        lineHeight: '155%',
                        color: theme.colors.gray[10], // #212529
                    }),
                    // Стиль для веса товара
                    ...(params.variant === 'productWeight' && {
                        fontFamily: 'Open Sans',
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: theme.colors.gray[7], // #868E96
                    }),
                    // Стиль для цены
                    ...(params.variant === 'productPrice' && {
                        fontFamily: 'Inter',
                        fontWeight: 600,
                        fontSize: '20px',
                        lineHeight: '24px',
                        color: theme.colors.gray[11],
                    }),
                }
            })
        },
    }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider theme={theme}>
            <App />
        </MantineProvider>
    </React.StrictMode>,
)