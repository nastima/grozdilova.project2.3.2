import { render, screen, fireEvent } from '../../test/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CartPopup from './CartPopup';
import { CartItem } from '../../types/types';

// Мок для компонента QuantityStepper
vi.mock('../QuantityStepper/QuantityStepper', () => ({
    QuantityStepper: ({ value, onChange }: any) => (
        <div data-testid="quantity-stepper" data-value={value}>
            <button
                data-testid="decrease-btn"
                onClick={() => onChange(value - 1)}
            >
                -
            </button>
            <span>{value}</span>
            <button
                data-testid="increase-btn"
                onClick={() => onChange(value + 1)}
            >
                +
            </button>
        </div>
    ),
}));

// Мок для Mantine Modal
vi.mock('@mantine/core', async () => {
    const actual = await vi.importActual('@mantine/core');
    return {
        ...actual,
        Modal: ({ children, opened, onClose }: any) =>
            opened ? (
                <div data-testid="modal">
                    <button onClick={onClose} data-testid="close-modal">Close</button>
                    {children}
                </div>
            ) : null,
    };
});

describe('CartPopup Component', () => {
    // Mock-функции для отслеживания вызовов колбэков
    const mockOnClose = vi.fn();
    const mockOnUpdateQuantity = vi.fn();

    // Mock данные для тестов
    const mockCartItems: CartItem[] = [
        {
            id: 1,
            name: 'Tomato - 1kg',
            price: 300,
            quantity: 2,
            image: 'tomato.jpg'
        },
        {
            id: 2,
            name: 'Cucumber - 500g',
            price: 200,
            quantity: 1,
            image: 'cucumber.jpg'
        }
    ];

    // Базовые пропсы
    const baseProps = {
        isOpen: true,
        onClose: mockOnClose,
        onUpdateQuantity: mockOnUpdateQuantity,
    };

    // Пропсы для разных состояний корзины
    // Пустая корзина
    const emptyCartProps = {
        ...baseProps,
        cartItems: [],
    };
    // Корзина с товарами
    const filledCartProps = {
        ...baseProps,
        cartItems: mockCartItems,
    };

    // Очищаем все mock-вызовы между тестами
    beforeEach(() => {
        vi.clearAllMocks();
    });
    // 1. Тесты на рендеринг состояний
    describe('Rendering', () => {
        // Тест: Проверяем корректное отображение пустой корзины
        it('renders empty cart state when no items', () => {
            render(<CartPopup {...emptyCartProps} />);

            expect(screen.getByText('Your cart is empty!')).toBeInTheDocument();
        });
        // Тест: Проверяем отображение корзины с товарами
        it('renders cart items when cart has products', () => {
            render(<CartPopup {...filledCartProps} />);

            // Проверяем что все товары отображаются с правильными данными
            expect(screen.getByText('Tomato')).toBeInTheDocument();
            expect(screen.getByText('1kg')).toBeInTheDocument();
            expect(screen.getByText('Cucumber')).toBeInTheDocument();
            expect(screen.getByText('500g')).toBeInTheDocument();
            // Проверяем корректность вычисленных цен (цена × количество)
            expect(screen.getByText('き600')).toBeInTheDocument();
            expect(screen.getByText('き200')).toBeInTheDocument();
        });
        // Тест: Проверяем что модалка не отображается когда isOpen = false
        it('does not render when isOpen is false', () => {
            render(<CartPopup {...filledCartProps} isOpen={false} />);

            expect(screen.queryByText('Tomato')).not.toBeInTheDocument();
        });
    });
    // 2. Тесты на вычисления
    describe('Calculations', () => {
        // Тест: Проверяем правильность расчета общей суммы корзины
        it('calculates total price correctly', () => {
            render(<CartPopup {...filledCartProps} />);

            expect(screen.getByText('$ 800')).toBeInTheDocument();
        });
        // Тест: Проверяем что блок с общей суммой скрыт для пустой корзины
        it('shows zero total for empty cart', () => {
            render(<CartPopup {...emptyCartProps} />);

            expect(screen.queryByText('Total')).not.toBeInTheDocument();
        });
    });
    // 3. Тесты на взаимодействия
    describe('Interactions', () => {
        // Тест: Проверяем обработку изменения количества товара
        it('calls onUpdateQuantity when quantity is changed', () => {
            render(<CartPopup {...filledCartProps} />);
            const decreaseButtons = screen.getAllByTestId('decrease-btn');

            fireEvent.click(decreaseButtons[0]);
            expect(mockOnUpdateQuantity).toHaveBeenCalledWith(1, 1);
        });
        // Тест: Проверяем закрытие модального окна
        it('calls onClose when modal is closed', () => {
            render(<CartPopup {...filledCartProps} />);

            fireEvent.click(screen.getByTestId('close-modal'));
            expect(mockOnClose).toHaveBeenCalledTimes(1);
        });
    });
    // 4. Тесты на форматирование данных
    describe('Data formatting', () => {
        // Тест: Проверяем корректное разделение названия товара на имя и вес
        it('splits product name and weight correctly', () => {
            render(<CartPopup {...filledCartProps} />);

            expect(screen.getByText('Tomato')).toBeInTheDocument();
            expect(screen.getByText('1kg')).toBeInTheDocument();
            expect(screen.getByText('Cucumber')).toBeInTheDocument();
            expect(screen.getByText('500g')).toBeInTheDocument();
        });
        // Тест: Проверяем обработку товаров без указания веса в названии
        it('handles products without weight in name', () => {
            const itemsWithoutWeight: CartItem[] = [{
                id: 3,
                name: 'Apple',
                price: 100,
                quantity: 1,
                image: 'apple.jpg'
            }];

            render(<CartPopup {...baseProps} cartItems={itemsWithoutWeight} />);

            expect(screen.getByText('Apple')).toBeInTheDocument();
        });
    });
    // 5. Тесты на UI элементы
    describe('UI Elements', () => {
        // Тест: Проверяем что для каждого товара рендерится свой счетчик
        it('renders quantity steppers for each product', () => {
            render(<CartPopup {...filledCartProps} />);

            const steppers = screen.getAllByTestId('quantity-stepper');

            expect(steppers).toHaveLength(2);
        });
        // Тест: Проверяем корректное отображение изображений товаров
        it('shows product images with correct attributes', () => {
            render(<CartPopup {...filledCartProps} />);

            const images = screen.getAllByRole('img');
            const productImages = images.filter(img => img.getAttribute('src'));

            expect(productImages[0]).toHaveAttribute('src', 'tomato.jpg');
            expect(productImages[0]).toHaveAttribute('alt', 'Tomato - 1kg');
            expect(productImages[1]).toHaveAttribute('src', 'cucumber.jpg');
            expect(productImages[1]).toHaveAttribute('alt', 'Cucumber - 500g');
        });
    });
});