//  пропсы для шапки
export interface HeaderProps {
    onCartClick: () => void;
    cartItemsCount: number;
}

//  пропсы для товаров
export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
}

//  пропсы для карточек
export interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product, quantity: number) => void;
    isLoading?: boolean;
}

//  пропсы для сетки
export interface ProductGridProps {
    products: Product[];
    onAddToCart: (product: Product, quantity: number) => void;
    loading?: boolean
}

//  пропсы для корзины
export interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

//  пропсы для кнопки корзины
export interface CartProps {
    cartItems: CartItem[];
    isOpen: boolean;
    onClose: () => void;
    onUpdateQuantity: (id: number, quantity: number) => void;
}
// пропсы для степпера
export interface QuantityStepperProps {
    value?: number;
    onChange?: (value: number) => void;
    min?: number;
    max?: number;
}