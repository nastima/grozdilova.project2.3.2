import React, { useState, useEffect } from 'react';
import ProductGrid from './components/ProductGrid/ProductGrid';
import Header from "./components/Header/Header";
import { Product, CartItem  } from './types/types';
import CartPopup from './components/CartPopup/CartPopup';
import './App.css'

const App: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [loading, setLoading] = useState(true);

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
                .catch(() => {
                    setLoading(false);
                });
        }, 3000);
    }, []);

    const handleAddToCart = (product: Product) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === product.id);
            if (existingItem) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prev, {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                }];
            }
        });
    };

    const handleUpdateQuantity = (id: number, quantity: number) => {
        if (quantity === 0) {
            setCartItems(prev => prev.filter(item => item.id !== id));
        } else {
            setCartItems(prev =>
                prev.map(item =>
                    item.id === id ? { ...item, quantity } : item
                )
            );
        }
    };

    const handleCartClick = () => {
        setIsCartOpen(true);
    };

    const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <Header
                cartItemsCount={totalItemsCount}
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
                loading={loading}
            />

            {/* Popup корзины */}
            <CartPopup
                cartItems={cartItems}
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                onUpdateQuantity={handleUpdateQuantity}
            />
        </div>
    );
};

export default App;