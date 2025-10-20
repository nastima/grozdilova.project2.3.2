import React, { useState, useEffect } from 'react';
import ProductGrid from './components/ProductGrid/ProductGrid';
import Header from "./components/Header/Header";
import { Product } from './types/types';
import './App.css'

const App: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);

        // Искусственная задержка 3 секунды для тестирования loader
        setTimeout(() => {
            fetch('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch products');
                    }
                    return response.json();
                })
                .then(data => {
                    setProducts(data);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error.message);
                    setLoading(false);
                });
        }, 3000);
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

            {/* Отображаем ошибку если есть */}
            {error && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '400px',
                        marginTop: '180px',
                        color: 'red',
                        fontSize: '18px',
                    }}
                >
                    Error: {error}
                </div>
            )}

            {/* ProductGrid показывается ВСЕГДА */}
                <ProductGrid
                    products={products}
                    onAddToCart={handleAddToCart}
                    loading={loading}
                />
        </div>
    );
};

export default App;