import { HeaderProps } from "../../types/types.ts";
import React from 'react';
import { Text, Button, Badge } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';

const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartClick }) => {
    const theme = useMantineTheme();
    const buttonWidth = cartItemsCount > 0 ? 174 : 144;
    const [isButtonHovered, setIsButtonHovered] = React.useState(false);

    const getButtonVariant = () => {
        if (isButtonHovered) return "filled-hover";
        return "filled";
    }

    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            minWidth: '1440px',
            width: '100%',
            height: '59px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: '20px',
            paddingLeft: '20px',
            margin: '0 auto',
            background: theme.white,
        }}>
            {/* Блок логотипа */}
            <div
                style={{
                    width: '209px',
                    height: '33px',
                    paddingLeft: '12px',
                    gap: '8px',
                    borderRadius: '31px',
                    background: theme.colors.gray[0],
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {/* Vegetable Text */}
                <Text variant="logoVegetable">
                    Vegetable
                </Text>

                {/* SHOP Text */}
                <div
                    style={{
                        width: '80px',
                        height: '33px',
                        borderRadius: '21px',
                        backgroundColor: theme.colors.green[6],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text variant="logoShop">
                        SHOP
                    </Text>
                </div>
            </div>

            {/* Кнопка */}
            <Button
                variant={getButtonVariant()}
                onClick={onCartClick}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                leftSection={
                    cartItemsCount > 0 ? (
                        <Badge variant="small">
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
                        padding: '10px 40px',
                    },
                    section: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 0,
                    }
                }}
            >
                Cart
            </Button>
        </header>
    );
};

export default Header;