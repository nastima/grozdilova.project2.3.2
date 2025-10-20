import React from 'react';
import { Card, Image, Text, Button, Group, Badge, ActionIcon } from "@mantine/core";
import { ProductCardProps } from "../../types/types.ts";
import { useMantineTheme } from '@mantine/core';

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, isLoading = false  }) => {
    const theme = useMantineTheme();
    const [quantity, setQuantity] = React.useState(1);

    return (
        <Card
            variant={isLoading ? "loading" : "default"}
            padding="16px"
        >
            {!isLoading ? (
                // Контент для обычного состояния
                <>
                    <Image
                        src={product.image}
                        height={276}
                        width={276}
                        alt={product.name}
                    />

                    {/* Первая строка: Название товара и количество */}
                    <Group
                        style={{
                            width: '270px',
                            height: '30px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            margin: '0 16px',
                        }}
                    >
                        {/* Название и вес отдельно */}
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                            {/* Название */}
                            <Text variant="productName">
                                {product.name.split(' - ')[0]}
                            </Text>

                            {/* Вес */}
                            <Text variant="productWeight">
                                {product.name.split(' - ')[1]?.toLowerCase() || ''}
                            </Text>
                        </div>

                        {/* - количество + */}
                        <Group style={{ display: 'flex', width: '90px', height: '30px' }}>
                            <ActionIcon onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="2" fill="none">
                                    <path fill={theme.colors.gray[10]} d="M0 2V0h12v2z"/>
                                </svg>
                            </ActionIcon>

                            <Badge variant="clear">
                                {quantity}
                            </Badge>

                            <ActionIcon onClick={() => setQuantity(prev => prev + 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none">
                                    <path fill={theme.colors.gray[10]} d="M7 0H5v5H0v2h5v5h2V7h5V5H7z"/>
                                </svg>
                            </ActionIcon>
                        </Group>
                    </Group>

                    {/* Вторая строка: Цена и кнопка добавления в корзину */}
                    <Group
                        style={{
                            width: '270px',
                            height: '44px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline',
                            margin: '0 16px',
                        }}
                    >
                        {/* Цена */}
                        <Text variant="productPrice">
                            ${product.price}
                        </Text>

                        {/* Кнопка добавления в корзину */}
                        <Button
                            variant="light"
                            onClick={() => {
                                for (let i = 0; i < quantity; i++) {
                                    onAddToCart(product);
                                }
                                setQuantity(1);
                            }}
                            rightSection={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="19"
                                    height="19"
                                    fill="none"
                                >
                                    <path fill={theme.colors.green[8]} d="M1.5.66a.833.833 0 1 0 0 1.667zm1.91.834.805-.218A.83.83 0 0 0 3.41.661zm3.105 11.463-.804.217c.108.401.495.661.907.61zm9.552-1.194.104.826a.83.83 0 0 0 .712-.658zM17.5 4.837l.816.169a.833.833 0 0 0-.816-1.002zm-13.184 0-.804.218zM1.5 2.327h1.91V.661H1.5zm5.118 11.457 9.553-1.195-.207-1.653-9.552 1.194zm10.265-1.853 1.433-6.925-1.632-.338-1.433 6.926zM2.606 1.711l.906 3.344 1.608-.436-.905-3.343zm.906 3.344 2.199 8.12 1.608-.436-2.199-8.12zM17.5 4.004H4.316V5.67H17.5zm-8.833 12.08c0 .23-.187.416-.417.416v1.667c1.15 0 2.083-.933 2.083-2.084zm-.417.416a.417.417 0 0 1-.417-.417H6.167c0 1.15.932 2.084 2.083 2.084zm-.417-.417c0-.23.187-.416.417-.416V14c-1.15 0-2.083.933-2.083 2.083zm.417-.416c.23 0 .417.186.417.416h1.666c0-1.15-.932-2.083-2.083-2.083zm7.083.416c0 .23-.186.417-.416.417v1.667c1.15 0 2.083-.933 2.083-2.084zm-.416.417a.417.417 0 0 1-.417-.417h-1.667c0 1.15.933 2.084 2.084 2.084zm-.417-.417c0-.23.187-.416.417-.416V14c-1.15 0-2.084.933-2.084 2.083zm.417-.416c.23 0 .416.186.416.416H17c0-1.15-.933-2.083-2.083-2.083z"/>
                                </svg>
                            }
                            styles={{
                                root: {
                                    width: '204px',
                                    height: '44px',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                }
                            }}
                        >
                            Add to cart
                        </Button>
                    </Group>
                </>
            ) : (
                // Контент для состояния loading
                <div style={{
                    width: '100%',
                    height: '100%',
                    padding: '16px 10px 0 16px',
            }}>
                    <div style={{
                        width: '276px',
                        height: '276px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                        backgroundColor: theme.colors.gray[1],
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" fill="none">
                            <rect width="2.444" height="19.556" fill="#ced4da" rx="1.222"/>
                            <rect width="2.444" height="6.519" x="4.889" y="6.518" fill="#ced4da" rx="1.222"/>
                            <rect width="2.444" height="13.037" x="9.778" y="3.259" fill="#ced4da" rx="1.222"/>
                            <rect width="2.444" height="6.519" x="14.667" y="6.518" fill="#ced4da" rx="1.222"/>
                            <rect width="2.444" height="19.556" x="19.555" fill="#ced4da" rx="1.222"/>
                        </svg>
                    </div>

        </div>
    )}
        </Card>
    );
};

export default ProductCard;