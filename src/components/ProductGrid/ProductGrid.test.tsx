import { render, screen } from '../../test/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProductGrid from './ProductGrid';
import { Product } from '../../types/types';

// Мок для ProductCard
vi.mock('../ProductCard/ProductCard', () => {
    const ProductCardMock = vi.fn(({ product, isLoading }) => (
        <div
            data-testid="product-card"
            data-product-id={product.id}
            data-loading={isLoading}
        >
            {isLoading ? 'Loading...' : product.name}
        </div>
    ));

    return {
        default: ProductCardMock,
    };
});

describe('ProductGrid Component', () => {
    const mockOnAddToCart = vi.fn();

    // Mock данные для тестов
    const mockProducts: Product[] = [
        {
            id: 1,
            name: 'Tomato - 1kg',
            price: 300,
            image: 'tomato.jpg',
            category: 'vegetables'
        },
        {
            id: 2,
            name: 'Cucumber - 500g',
            price: 200,
            image: 'cucumber.jpg',
            category: 'vegetables'
        },
        {
            id: 3,
            name: 'Apple',
            price: 100,
            image: 'apple.jpg',
            category: 'fruits'
        },
        {
            id: 4,
            name: 'Carrot - 2kg',
            price: 400,
            image: 'carrot.jpg',
            category: 'vegetables'
        }
    ];
    // Базовые пропсы
    const defaultProps = {
        products: mockProducts,
        onAddToCart: mockOnAddToCart,
        loading: false,
    };
    // Очищаем все mock-вызовы между тестами
    beforeEach(() => {
        vi.clearAllMocks();
    });

    // 1. Тесты на рендеринг продуктов
    describe('Rendering products', () => {
        // Тест: Проверяем корректное отображение списка продуктов
        it('renders correct number of product cards', () => {
            render(<ProductGrid {...defaultProps} />);

            // Должны отображаться все продукты из массива
            const productCards = screen.getAllByTestId('product-card');
            expect(productCards).toHaveLength(mockProducts.length);
        });

        // Тест: Проверяем передачу правильных пропсов в ProductCard
        it('passes correct props to ProductCard components', () => {
            render(<ProductGrid {...defaultProps} />);

            const productCards = screen.getAllByTestId('product-card');

            // Проверяем что каждый ProductCard получает правильные данные
            expect(productCards[0]).toHaveAttribute('data-product-id', '1');
            expect(productCards[1]).toHaveAttribute('data-product-id', '2');
            expect(productCards[2]).toHaveAttribute('data-product-id', '3');
            expect(productCards[3]).toHaveAttribute('data-product-id', '4');
        });
    });

    // 2. Тесты на состояние загрузки
    describe('Loading state', () => {
        // Тест: Проверяем отображение скелетонов при загрузке
        it('renders loading skeletons when loading is true', () => {
            render(<ProductGrid {...defaultProps} loading={true} />);

            // Должны отображаться 8 скелетонов (как в компоненте)
            const productCards = screen.getAllByTestId('product-card');
            expect(productCards).toHaveLength(8);
        });

        // Тест: Проверяем что скелетоны помечены как loading
        it('marks loading skeletons with loading state', () => {
            render(<ProductGrid {...defaultProps} loading={true} />);

            const productCards = screen.getAllByTestId('product-card');

            // Все скелетоны должны иметь data-loading="true"
            productCards.forEach(card => {
                expect(card).toHaveAttribute('data-loading', 'true');
            });
        });
    });

    // 3. Тесты на пустые состояния
    describe('Empty states', () => {
        // Тест: Проверяем обработку пустого массива продуктов
        it('handles empty products array', () => {
            render(<ProductGrid {...defaultProps} products={[]} />);

            // При пустом массиве не должно быть карточек продуктов
            const productCards = screen.queryAllByTestId('product-card');
            expect(productCards).toHaveLength(0);
        });

        // Тест: Проверяем что сетка отображается даже при пустом массиве
        it('renders grid container with empty products', () => {
            const { container } = render(<ProductGrid {...defaultProps} products={[]} />);

            // Контейнер сетки должен присутствовать
            const gridContainer = container.firstChild;
            expect(gridContainer).toBeInTheDocument();
        });
    });


    // 4. Тесты на разные размеры массивов
    describe('Different array sizes', () => {
        // Тест: Проверяем работу с одним продуктом
        it('handles single product', () => {
            const singleProduct = [mockProducts[0]];
            render(<ProductGrid {...defaultProps} products={singleProduct} />);

            const productCards = screen.getAllByTestId('product-card');
            expect(productCards).toHaveLength(1);
        });

        // Тест: Проверяем работу с большим количеством продуктов
        it('handles large number of products', () => {
            const manyProducts = Array.from({ length: 12 }, (_, index) => ({
                ...mockProducts[0],
                id: index + 1
            }));

            render(<ProductGrid {...defaultProps} products={manyProducts} />);

            const productCards = screen.getAllByTestId('product-card');
            expect(productCards).toHaveLength(12);
        });
    });

    // 5. Базовые тесты на главную функциональность
    describe('Basic functionality', () => {
        // Тест: Проверяем что компонент не падает при рендере
        it('renders without crashing', () => {
            expect(() => render(<ProductGrid {...defaultProps} />)).not.toThrow();
        });

        // Тест: Проверяем что loading состояние работает
        it('handles loading state correctly', () => {
            render(<ProductGrid {...defaultProps} loading={true} />);

            const productCards = screen.getAllByTestId('product-card');
            expect(productCards).toHaveLength(8);
            expect(productCards[0]).toHaveAttribute('data-loading', 'true');
        });
    });
});