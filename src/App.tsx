import React, { useState, useEffect } from 'react';
import ProductGrid from './components/ProductGrid/ProductGrid';
import Header from "./components/Header/Header";
import { Product } from './types/types';
import './App.css'

const App: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [cartItemsCount, setCartItemsCount] = useState(0);

    useEffect(() => {
        // Загрузка данных из API
        fetch('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    const handleAddToCart = (product: Product) => {
        setCartItemsCount(prev => prev + 1);
        console.log('Added to cart:', product.name);
    };

    const handleCartClick = () => {
        // Логика открытия корзины
        console.log('Cart clicked');
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <Header
                cartItemsCount={cartItemsCount}
                onCartClick={handleCartClick}
            />

            {/* Заголовок Catalog */}
            <div
                style={{
                    position: 'absolute',
                    top: '119px',
                    left: '80px',
                    width: '121px',
                    height: '40px',
                    textAlign: 'left',
                }}
            >
                <h1
                    style={{
                        fontSize: '32px',
                        fontWeight: 600,
                        margin: 0,
                        lineHeight: '40px',
                        letterSpacing: '0%',

                    }}
                >
                    Catalog
                </h1>
            </div>

            <ProductGrid
                products={products}
                onAddToCart={handleAddToCart}
            />
        </div>
    );
};

export default App;