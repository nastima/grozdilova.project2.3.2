import { HeaderProps } from "../../types/types.ts";
import React from 'react';
import { Text, Button, Badge } from '@mantine/core';

const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartClick }) => {
    const buttonWidth = cartItemsCount > 0 ? 174 : 144;

    return (
        <header style={{
            width: '1440px',
            height: '59px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: '20px',
            paddingLeft: '20px',
            margin: '0 auto'
        }}>
            {/* Блок логотипа */}
            <div
                style={{
                    width: '209px',
                    height: '33px',
                    paddingLeft: '12px',
                    gap: '8px',
                    borderRadius: '31px',
                    background: '#F7F7F7',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {/* Vegetable Text с нулевыми отступами */}
                <Text
                    style={{
                        width: '109px',
                        height: '27px',
                        opacity: 0.9,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        letterSpacing: '0%',
                        margin: 0,
                        padding: 0,
                    }}
                    fw={600}
                    size="22px"
                    lh="100%"
                >
                    Vegetable
                </Text>

                {/* SHOP Text с нулевыми отступами */}
                <div
                    style={{
                        width: '80px',
                        height: '33px',
                        borderRadius: '21px',
                        backgroundColor: '#54B46A',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text
                        fw={600}
                        size="14px"
                        style={{
                            lineHeight: '1',
                            color: 'white',
                            margin: 0,
                            padding: 0,
                        }}
                    >
                        SHOP
                    </Text>
                </div>
            </div>

            {/* Кнопка */}
            <Button
                variant="filled"
                onClick={onCartClick}
                leftSection={
                    cartItemsCount > 0 ? (
                        <Badge
                            style={{
                                backgroundColor: 'white',
                                color: '#54B46A',
                                width: '20px',
                                height: '20px',
                                padding: '3px 9px',
                                fontSize: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '36px',
                                border: 'none',
                                minWidth: '20px',
                                gap: '9px',
                            }}
                        >
                            {cartItemsCount}
                        </Badge>
                    ) : undefined
                }
                rightSection={
                    <svg
                        width="20"
                        height="20"
                        fill="none"
                        style={{ opacity: 1 }}
                    >
                        <path fill="#fff" d="M1 .16a.833.833 0 0 0 0 1.667zm1.91.834.805-.218A.83.83 0 0 0 2.91.161zm3.105 11.463-.804.217c.108.401.495.661.907.61zm9.552-1.194.104.826a.83.83 0 0 0 .712-.658zM17 4.337l.816.169A.833.833 0 0 0 17 3.504zm-13.184 0-.804.218zM1 1.827h1.91V.161H1zm5.118 11.457 9.553-1.195-.207-1.653-9.552 1.194zm10.265-1.853 1.433-6.925-1.632-.338-1.433 6.926zM2.106 1.211l.906 3.344 1.608-.436L3.715.776zm.906 3.344 2.199 8.12 1.608-.436-2.199-8.12zM17 3.504H3.816V5.17H17zm-8.833 12.08c0 .23-.187.416-.417.416v1.667c1.15 0 2.083-.933 2.083-2.084zM7.75 16a.417.417 0 0 1-.417-.417H5.667c0 1.15.932 2.084 2.083 2.084zm-.417-.417c0-.23.187-.416.417-.416V13.5c-1.15 0-2.083.933-2.083 2.083zm.417-.416c.23 0 .417.186.417.416h1.666c0-1.15-.932-2.083-2.083-2.083zm7.083.416c0 .23-.186.417-.416.417v1.667c1.15 0 2.083-.933 2.083-2.084zm-.416.417a.417.417 0 0 1-.417-.417h-1.667c0 1.15.933 2.084 2.084 2.084zM14 15.583c0-.23.187-.416.417-.416V13.5c-1.15 0-2.084.933-2.084 2.083zm.417-.416c.23 0 .416.186.416.416H16.5c0-1.15-.933-2.083-2.083-2.083z"/>
                    </svg>
                }
                styles={{
                    root: {
                        width: buttonWidth,
                        height: '44px',
                        padding: '10px 40px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        backgroundColor: '#54B46A',
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        opacity: 1,
                        gap: '10px',
                    },
                    inner: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        flexDirection: 'row',
                    },
                    section: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 0,
                    },
                    label: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        width: 'auto',
                    }
                }}
            >
                <Text
                    fw={600}
                    size="16px"
                    lh="24px"
                    style={{
                        color: 'white',
                        margin: 0,
                        padding: 0,
                    }}
                >
                    Cart
                </Text>
            </Button>
        </header>
    );
};

export default Header;