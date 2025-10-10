// import {useState} from "react";
// import Header from "./components/Header/Header.tsx";
// import './App.css'
//
// function App() {
//     const [cartItemsCount, setCartItemsCount] = useState(0);
//
//     const handleCartClick = () => {
//         alert(`В корзине ${cartItemsCount} товаров`);
//         // Здесь будет логика открытия корзины
//     };
//
//     const handleAddToCart = () => {
//         setCartItemsCount(prev => prev + 1);
//     }
//     return (
//         <div className='App'>
//             <Header
//                 onCartClick={handleCartClick}
//                 cartItemsCount={cartItemsCount}
//             />
//             <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
//
//                 {/* Демонстрационная кнопка для тестирования */}
//                 <button
//                     onClick={handleAddToCart}
//                     style={{
//                         marginTop: '1rem',
//                         padding: '10px 20px',
//                         backgroundColor: '#28a745',
//                         color: 'white',
//                         border: 'none',
//                         borderRadius: '5px',
//                         cursor: 'pointer'
//                     }}
//                 >
//                     cart
//                 </button>
//             </main>
//         </div>
//     )
// }
//
// export default App