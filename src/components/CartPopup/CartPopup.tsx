import React from "react";
import {Modal, Group, Text, Image, ActionIcon, Divider} from "@mantine/core";
import {CartProps} from "../../types/types.ts";
import {useMantineTheme} from "@mantine/core";

const CartPopup: React.FC<CartProps> = ({
    cartItems,
    isOpen,
    onClose,
    onUpdateQuantity,
                                        }) => {
    const theme = useMantineTheme();
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);



    return (
        <Modal
            opened={isOpen}
            onClose={onClose}
            withCloseButton={false}
            size='auto'
            variant={cartItems.length === 0 ? 'cartEmpty' : 'cartWithItems'}
        >
            {cartItems.length === 0 ? (
                // Состояние пустой корзины
                <>
                    <div style={{
                        border: '1px solid gray',
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="119" height="108" fill="none">
                        <path fill="#f2f2f2" d="M79.984 39.18c-8.37 0-16.89-.34-24.86-2.56-7.82-2.17-15-6.38-21.4-11.25-4.19-3.17-8-5.7-13.44-5.32a24.9 24.9 0 0 0-14.52 5.67c-6.92 6.06-5.88 17.29-3.11 25.15 4.16 11.87 16.82 20.14 27.58 25.49 12.43 6.21 26.09 9.82 39.78 11.89 12 1.83 27.42 3.15 37.82-4.68 9.55-7.21 12.17-23.65 9.83-34.75a13.65 13.65 0 0 0-4.91-8.32c-6.71-4.91-16.72-1.63-24.26-1.47-2.8.06-5.65.13-8.51.15M59.904 107.71c20.274 0 36.71-1.025 36.71-2.29s-16.436-2.29-36.71-2.29-36.71 1.025-36.71 2.29 16.436 2.29 36.71 2.29"/>
                        <path stroke="#bababa" stroke-linecap="round" stroke-linejoin="round" d="m8.104 17.13 13-1.1a7.1 7.1 0 0 1 7.41 5l12.46 41.7-2.44 4.37a7.12 7.12 0 0 0 6.79 10.56l49.9-4.24"/>
                        <path fill="#fff" stroke="#bababa" stroke-linecap="round" stroke-linejoin="round" d="m30.374 27.36 58-4.92a3.82 3.82 0 0 1 4.11 4.33l-3.93 28.37a3.83 3.83 0 0 1-3.42 3.28l-44.16 4.31zM50.874 87.22a4.71 4.71 0 1 0 0-9.42 4.71 4.71 0 0 0 0 9.42M83.674 84.44a4.71 4.71 0 1 0 0-9.42 4.71 4.71 0 0 0 0 9.42"/>
                        <path fill="#d2d2d2" d="m18.398 14.904-12.256 1.04a1.93 1.93 0 0 0 .327 3.846l12.256-1.04a1.93 1.93 0 1 0-.327-3.846"/>
                        <path stroke="#bababa" stroke-linecap="round" stroke-linejoin="round" d="M54.794 49.27a8.07 8.07 0 0 1 15.71-1.34"/>
                        <path fill="#bababa" d="M70.634 38.48a1.12 1.12 0 1 0 0-2.24 1.12 1.12 0 0 0 0 2.24M52.884 39.98a1.12 1.12 0 1 0 0-2.24 1.12 1.12 0 0 0 0 2.24"/>
                        <path stroke="#bababa" stroke-linecap="round" stroke-linejoin="round" d="M21.334 81.12v4.31M19.184 83.27h4.3M90.044 1v4.3M87.894 3.15h4.3M39.134 13.85v4.3M36.974 16h4.31"/>
                        <path fill="#fff" stroke="#bababa" stroke-linecap="round" stroke-linejoin="round" d="M100.774 29.66a1.02 1.02 0 1 0 0-2.04 1.02 1.02 0 0 0 0 2.04"/>
                        <path fill="#cfcfcf" d="M62.654 20.49a.98.98 0 1 0 0-1.96.98.98 0 0 0 0 1.96M69.234 91.61a.98.98 0 1 0 0-1.96.98.98 0 0 0 0 1.96"/>
                    </svg>
                    </div>
                    <Text variant='emptyCartText'>
                        Your cart is empty!
                    </Text>
                </>
            ) : (
                // Состояние с товарами
                <>
                    {/* Список товаров */}

                        {cartItems.map((item, index) => (
                            <div key={item.id}>
                                <Group
                                    variant='cartItemGroupDivider'
                                    style={{
                                        border: '1px solid blue',
                                    }}
                                >
                                <Group variant='cartItemGroup'>
                                    {/* Изображение товара */}
                                    <Image
                                        src={item.image}
                                        variant="cartImage"
                                        radius="6px"
                                        alt={item.name}
                                    />
                                </Group>
                                    {/* Разделитель */}
                                    <Divider variant='cartItemDivider'/>
                                </Group>
                            </div>
                        ))}

                    {/*<Divider variant='cartTotalDivider'>*/}
                    {/*    <svg xmlns="http://www.w3.org/2000/svg" width="396" height="1" fill="none">*/}
                    {/*        <path stroke="#dee2e6" d="M0 .5h396"/>*/}
                    {/*    </svg>*/}
                    {/*</Divider>*/}

                    {/* Итоговая сумма */}

                </>
            )}
        </Modal>
    );
};

export default CartPopup;