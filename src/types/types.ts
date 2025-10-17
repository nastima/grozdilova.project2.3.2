
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
    onAddToCart: (product: Product) => void;
    isLoading?: boolean;
}

//  пропсы для сетки
export interface ProductGridProps {
    products: Product[];
    onAddToCart: (product: Product) => void;
    loading?: boolean
}