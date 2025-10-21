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
            '#3b944e',
            '#2a7a3f'
        ],
        gray: [
            '#FFFFFF',
            '#F7F7F7',
            '#F1F3F5',
            '#E9ECEF',
            '#DEE2E6',
            '#CED4DA',
            '#ADB5BD',
            '#868E96',
            '#495057',
            '#343A40',
            '#212529',
        ]
    },
    fontFamily: 'Open Sans, Inter, sans-serif',
    components: {
        ActionIcon: {
            defaultProps: {
                variant: 'light',
                size: '30px',
            },
            styles: (theme: any) => ({
                root: {
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    backgroundColor: theme.colors.gray[4],
                    border: 'none',
                    '&:hover': {
                        backgroundColor: theme.colors.gray[5],
                    }
                }
            })
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
                    cursor: 'pointer',
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: '16px',
                    lineHeight: '24px',
                    // Primary Button
                    ...(params.variant === 'filled' && {
                        backgroundColor: theme.colors.green[6],
                        color: theme.white,
                        '&:hover': {
                            backgroundColor: theme.colors.green[8],
                        }
                    }),
                    // Secondary Button
                    ...(params.variant === 'light' && {
                        backgroundColor: theme.colors.green[0],
                        color: theme.colors.green[8],
                        '&:hover': {
                            backgroundColor: theme.colors.green[1],
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
                    cursor: 'pointer',
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
            styles: (_theme: any, params: { variant?: string }) => ({
                root: {
                    // Стиль корзине
                    ...(params.variant === 'cartImage' && {
                        width: '64px',
                        height: '64px',
                        borderRadius: '6px',
                        flexShrink: 0,
                    }),

                    // Стиль для карточек
                    ...(params.variant === 'productImage' && {
                        width: '276px',
                        height: '276px',
                        margin: '16px 10px 0 16px',
                    }),
                },
                image: {
                    // Стиль для изображений в корзине
                    ...(params.variant === 'cartImage' && {
                        width: '64px',
                        height: '64px',
                        borderRadius: '1.86px',
                        objectFit: 'cover',
                    }),
                    // Стиль для изображений в карточках продуктов
                    ...(params.variant === 'productImage' && {
                        width: '276px',
                        height: '276px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                    }),
                }
            })
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
                        color: theme.colors.gray[10],
                    }),
                    // Стиль для веса товара
                    ...(params.variant === 'productWeight' && {
                        fontFamily: 'Open Sans',
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: theme.colors.gray[7],
                    }),
                    // Стиль для цены
                    ...(params.variant === 'productPrice' && {
                        fontFamily: 'Inter',
                        fontWeight: 600,
                        fontSize: '20px',
                        lineHeight: '24px',
                        color: theme.colors.gray[11],
                    }),
                    // Vegetable в логотипе
                    ...(params.variant === 'logoVegetable' && {
                        width: '109px',
                        height: '27px',
                        opacity: 0.9,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        letterSpacing: '0%',
                        margin: 0,
                        padding: 0,
                        fontWeight: 600,
                        fontSize: '22px',
                        lineHeight: '100%',
                    }),
                    // SHOP в логотипе
                    ...(params.variant === 'logoShop' && {
                        lineHeight: '1',
                        color: theme.white,
                        margin: 0,
                        padding: 0,
                        fontWeight: 600,
                        fontSize: '14px',
                    }),
                    // Стили для текста в пустом попапе
                    ...(params.variant === 'emptyCartText' && {
                        opacity: '1',
                        fontFamily: 'Inter',
                        fontWeight: 400,
                        fontSize: '16px',
                        lineHeight: '24px',
                        color: theme.colors.gray[6],
                        textAlign: 'center',
                    }),
                    // Стили для названия продуктов в попапе
                    ...(params.variant === 'cartProductName' && {
                        fontFamily: 'Inter',
                        fontWeight: 600,
                        fontSize: '18px',
                        lineHeight: '155%',
                        color: theme.colors.gray[9],
                    }),
                    // Стили для веса 1кг в попапе
                    ...(params.variant === 'cartProductWeight' && {
                        fontFamily: 'Open Sans',
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: theme.colors.gray[6],
                    }),
                    // Стили для цены в попапе
                    ...(params.variant === 'cartProductPrice' && {
                        fontFamily: 'Inter',
                        fontWeight: 600,
                        fontSize: '20px',
                        lineHeight: '24px',
                        color: theme.colors.gray[9],
                    }),
                    // Стили для текста в попапе
                    ...(params.variant === 'cartTotalText' && {
                        fontFamily: 'Inter',
                        fontWeight: 600,
                        fontSize: '16px',
                        lineHeight: '24px',
                        color: theme.black,
                        textAlign: 'center',
                    }),
                    // Стили для общей цены в попапе
                    ...(params.variant === 'cartTotalPrice' && {
                        fontFamily: 'Inter',
                        fontWeight: 600,
                        fontSize: '16px',
                        lineHeight: '24px',
                        color: theme.black,
                        textAlign: 'center',
                    }),
                }
            })
        },
        Modal: {
            styles: (theme: any, params: { variant?: string }) => ({
                root: {
                    // Модалка с товарами
                    ...(params.variant === 'cartWithItems' && {
                        position: 'absolute',
                        top: '71px',
                        left: '976px',
                    }),
                    // Модалка пустой корзины
                    ...(params.variant === 'cartEmpty' && {
                        position: 'absolute',
                        top: '71px',
                        left: '1119px',
                    }),
                },
                content: {
                    // Модалка с товарами
                    ...(params.variant === 'cartWithItems' && {
                        width: '444px',
                        borderRadius: '16px',
                        padding: '24px',
                        background: theme.white,
                        boxShadow: '0px 2px 8px 0px #21252914, 0px 1px 2px 0px #2125291A',
                    }),
                    // Модалка пустой корзины
                    ...(params.variant === 'cartEmpty' && {
                        width: '301px',
                        height: '227px',
                        borderRadius: '16px',
                        padding: '24px',
                        background: theme.white,
                        boxShadow: '0px 2px 8px 0px #21252914, 0px 1px 2px 0px #2125291A',
                    }),
                },
                body: {
                    // Модалка с товарами
                    ...(params.variant === 'cartWithItems' && {
                        padding: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                    }),
                    // Модалка пустой корзины
                    ...(params.variant === 'cartEmpty' && {
                        padding: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '24px',
                        justifyContent: 'center',
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