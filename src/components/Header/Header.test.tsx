import { render, screen, fireEvent } from '../../test/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Header from './Header';

describe('Header', () => {
    // mock-функция
    const mockOnCartClick = vi.fn();

    // Пропсы для тестов
    const defaultProps = {
        cartItemsCount: 0,
        onCartClick: mockOnCartClick,
    };

    // Очищаем все mock-вызовы между тестами
    beforeEach(() => {
        vi.clearAllMocks();
    });

    // Тест 1: Проверяем базовый рендеринг компонента
    it('renders logo and cart button', () => {
        render(<Header {...defaultProps} />);

        expect(screen.getByText('Vegetable')).toBeInTheDocument();
        expect(screen.getByText('SHOP')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /cart/i })).toBeInTheDocument();
    });

    // Тест 2: Проверяем реакцию на клик по кнопке корзины
    it('calls onCartClick when button is clicked', () => {
        render(<Header {...defaultProps} />);

        fireEvent.click(screen.getByRole('button', { name: /cart/i }));
        expect(mockOnCartClick).toHaveBeenCalledTimes(1);
    });

    // Тест 3: Проверяем отображение бейджа когда в корзине есть товары
    it('shows badge when cart has items', () => {
        render(<Header {...defaultProps} cartItemsCount={5} />);

        expect(screen.getByText('5')).toBeInTheDocument();
    });

    // Тест 4: Проверяем что бейдж НЕ показывается когда корзина пустая
    it('does not show badge when cart is empty', () => {
        render(<Header {...defaultProps} cartItemsCount={0} />);

        expect(screen.queryByTestId('cart-badge')).not.toBeInTheDocument();
    });
});
