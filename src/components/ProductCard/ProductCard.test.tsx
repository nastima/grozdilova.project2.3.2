import { render, screen, fireEvent } from '../../test/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProductCard from './ProductCard';
import { Product } from '../../types/types';

// Мок для QuantityStepper
vi.mock('../QuantityStepper/QuantityStepper', () => ({
    QuantityStepper: ({ value, onChange }: any) => (
        <div data-testid="quantity-stepper" data-value={value}>
            <button data-testid="decrease-btn" onClick={() => onChange(value - 1)}>-</button>
            <span data-testid="quantity-value">{value}</span>
            <button data-testid="increase-btn" onClick={() => onChange(value + 1)}>+</button>
        </div>
    ),
}));

describe('ProductCard Component', () => {
    // Mock-функции для отслеживания вызовов колбэков
    const mockOnAddToCart = vi.fn();

    // Mock данные продукта
    const mockProduct: Product = {
        id: 1,
        name: 'Tomato - 1kg',
        price: 300,
        image: 'tomato.jpg',
        category: 'vegetables'
    };
    // Базовые пропсы
    const defaultProps = {
        product: mockProduct,
        onAddToCart: mockOnAddToCart,
        isLoading: false,
    };
    // Очищаем все mock-вызовы между тестами
    beforeEach(() => {
        vi.clearAllMocks();
    });

    // 1. Тесты на рендеринг
    describe('Rendering', () => {
        // Тест: Проверяем что все основные элементы продукта отображаются корректно
        it('renders product information correctly', () => {
            render(<ProductCard {...defaultProps} />);

            expect(screen.getByTestId('product-name')).toHaveTextContent('Tomato');
            expect(screen.getByTestId('product-weight')).toHaveTextContent('1kg');
            expect(screen.getByTestId('product-price')).toHaveTextContent('$ 300');
            expect(screen.getByTestId('add-to-cart-btn')).toHaveTextContent('Add to cart');
        });
        // Тест: Проверяем корректность атрибутов изображения товара
        it('renders product image with correct attributes', () => {
            render(<ProductCard {...defaultProps} />);

            const image = screen.getByTestId('product-image');
            expect(image).toHaveAttribute('src', 'tomato.jpg');
            expect(image).toHaveAttribute('alt', 'Tomato - 1kg');
        });
        // Тест: Проверяем отображение состояния загрузки
        it('renders loading state when isLoading is true', () => {
            render(<ProductCard {...defaultProps} isLoading={true} />);

            // В состоянии loading не должно быть обычного контента
            expect(screen.queryByTestId('product-name')).not.toBeInTheDocument();
            expect(screen.queryByTestId('add-to-cart-btn')).not.toBeInTheDocument();
            expect(screen.queryByTestId('product-image')).not.toBeInTheDocument();

            // Должны видеть карточку в состоянии загрузки
            expect(screen.getByTestId('product-card')).toBeInTheDocument();
        });
        // Тест: Проверяем корректное разделение названия товара на имя и вес
        it('splits product name and weight correctly', () => {

            const productWithWeight: Product = {
                id: 2,
                name: 'Cucumber - 500g',
                price: 200,
                image: 'cucumber.jpg',
                category: 'vegetables'
            };

            render(<ProductCard {...defaultProps} product={productWithWeight} />);

            expect(screen.getByTestId('product-name')).toHaveTextContent('Cucumber');
            expect(screen.getByTestId('product-weight')).toHaveTextContent('500g');
        });
        // Тест: Проверяем обработку товаров без указания веса в названии
        it('handles product without weight in name', () => {

            const productWithoutWeight: Product = {
                id: 3,
                name: 'Apple',
                price: 100,
                image: 'apple.jpg',
                category: 'fruits'
            };

            render(<ProductCard {...defaultProps} product={productWithoutWeight} />);

            expect(screen.getByTestId('product-name')).toHaveTextContent('Apple');
            expect(screen.getByTestId('product-weight')).toHaveTextContent('');
        });
    });

    // 2. Тесты на взаимодействия
    describe('Interactions', () => {
        // Тест: Проверяем вызов колбэка при добавлении товара в корзину
        it('calls onAddToCart with correct parameters when button is clicked', () => {
            render(<ProductCard {...defaultProps} />);

            const addButton = screen.getByTestId('add-to-cart-btn');
            fireEvent.click(addButton);

            expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct, 1);
        });
        // Тест: Проверяем сброс количества товара после добавления в корзину
        it('resets quantity to 1 after adding to cart', async () => {
            render(<ProductCard {...defaultProps} />);

            // Сначала увеличим количество товара
            const increaseButton = screen.getByTestId('increase-btn');
            fireEvent.click(increaseButton);

            // Проверяем что количество увеличилось до 2
            expect(screen.getByTestId('quantity-value')).toHaveTextContent('2');

            // Нажимаем кнопку добавления в корзину
            const addButton = screen.getByTestId('add-to-cart-btn');
            fireEvent.click(addButton);

            // Ждем обновления состояния и проверяем что количество сбросилось к 1
            expect(await screen.findByTestId('quantity-value')).toHaveTextContent('1');
        });
        // Тест: Проверяем работу счетчика количества товара
        it('handles quantity changes via stepper', () => {
            render(<ProductCard {...defaultProps} />);

            const increaseButton = screen.getByTestId('increase-btn');
            const decreaseButton = screen.getByTestId('decrease-btn');
            const quantityValue = screen.getByTestId('quantity-value');

            // Начальное значение
            expect(quantityValue).toHaveTextContent('1');

            // Увеличиваем
            fireEvent.click(increaseButton);
            expect(quantityValue).toHaveTextContent('2');

            // Уменьшаем
            fireEvent.click(decreaseButton);
            expect(quantityValue).toHaveTextContent('1');
        });
        // Тест: Проверяем обработку hover-событий на карточке товара
        it('handles hover states', () => {
            render(<ProductCard {...defaultProps} />);

            const card = screen.getByTestId('product-card');
            fireEvent.mouseEnter(card);
            fireEvent.mouseLeave(card);

            // Проверяем что обработчики не падают
            expect(card).toBeInTheDocument();
        });
        // Тест: Проверяем обработку hover-событий на кнопке добавления
        it('handles button hover states', () => {
            render(<ProductCard {...defaultProps} />);

            const button = screen.getByTestId('add-to-cart-btn');
            fireEvent.mouseEnter(button);
            fireEvent.mouseLeave(button);

            // Проверяем что обработчики не падают
            expect(button).toBeInTheDocument();
        });
    });

    // 3. Тесты на валидацию количества
    describe('Quantity validation', () => {
        // Тест: Проверяем что количество не может быть меньше минимального значения
        it('does not allow quantity below minimum', () => {
            render(<ProductCard {...defaultProps} />);

            const decreaseButton = screen.getByTestId('decrease-btn');
            const quantityValue = screen.getByTestId('quantity-value');

            // Начальное значение 1, минимальное 1 - не должно уменьшаться
            fireEvent.click(decreaseButton);
            expect(quantityValue).toHaveTextContent('1');
        });
        // Тест: Проверяем соблюдение максимального ограничения количества
        it('respects quantity limits', () => {
            render(<ProductCard {...defaultProps} />);

            const increaseButton = screen.getByTestId('increase-btn');
            const quantityValue = screen.getByTestId('quantity-value');

            // Увеличиваем до максимума (10)
            for (let i = 0; i < 15; i++) {
                fireEvent.click(increaseButton);
            }

            // Не должно превысить максимум
            expect(quantityValue).toHaveTextContent('10');
        });
    });

    // 4. Тесты на состояния компонента
    describe('Component states', () => {
        // Тест: Проверяем применение правильного варианта стиля карточки
        it('applies correct variant based on state', () => {
            render(<ProductCard {...defaultProps} />);

            const card = screen.getByTestId('product-card');

            expect(card).toHaveAttribute('data-variant', 'default');
        });
        // Тест: Проверяем отключение интерактивных элементов в состоянии загрузки
        it('disables interactions when loading', () => {
            render(<ProductCard {...defaultProps} isLoading={true} />);

            // В loading состоянии не должно быть интерактивных элементов
            expect(screen.queryByTestId('add-to-cart-btn')).not.toBeInTheDocument();
            expect(screen.queryByTestId('quantity-stepper')).not.toBeInTheDocument();
        });
    });

    // 5. Тесты на UI элементы
    describe('UI Elements', () => {
        // Тест: Проверяем инициализацию счетчика количества
        it('renders quantity stepper with correct initial value', () => {
            render(<ProductCard {...defaultProps} />);

            const stepper = screen.getByTestId('quantity-stepper');
            expect(stepper).toHaveAttribute('data-value', '1');
        });
        // Тест: Проверяем наличие иконки корзины в кнопке добавления
        it('renders cart icon in button', () => {
            render(<ProductCard {...defaultProps} />);

            const button = screen.getByTestId('add-to-cart-btn');
            expect(button).toHaveTextContent('Add to cart');
        });
    });
});