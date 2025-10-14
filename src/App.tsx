// import { useState } from "react";
import Header from "./components/Header/Header.tsx";

function App() {
    const cartItemsCount = 0;

    const handleCartClick = () => {
        console.log('Корзина clicked');
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Header
                cartItemsCount={cartItemsCount}
                onCartClick={handleCartClick}
            />
            <div style={{ flex: 1, width: '100%' }}>
                {/* Main component далее будет здесь */}
            </div>
        </div>
    )
}

export default App