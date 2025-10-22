import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent  } from '@testing-library/react';
import { render } from '../../test/test-utils';
import { QuantityStepper } from './QuantityStepper';

describe('QuantityStepper', () => {
    // Рендеринг начального значения
    it('should render with initial value', () => {
        render(<QuantityStepper value={3} onChange={() => {}} />);
        expect(screen.getByText('3')).toBeDefined();
    });
    // Увеличение значения
    it('should increment value when + button is clicked', () => {
        const mockOnChange = vi.fn();
        render(<QuantityStepper value={1} onChange={mockOnChange} />);

        const buttons = screen.getAllByRole('button');
        const incrementButton = buttons[1]; // Вторая кнопка это +
        fireEvent.click(incrementButton);

        expect(mockOnChange).toHaveBeenCalledWith(2);
    });
    // Защита от уменьшения ниже минимума
    it('should not decrement below min value', () => {
        const mockOnChange = vi.fn();
        render(<QuantityStepper value={1} onChange={mockOnChange} min={1} />);

        const buttons = screen.getAllByRole('button');
        const decrementButton = buttons[0];
        fireEvent.click(decrementButton);

        // Проверяем что не было вызова со значением меньше min
        const callsWithValuesLessThanMin = mockOnChange.mock.calls
            .filter(args => args[0] < 1);
        expect(callsWithValuesLessThanMin).toHaveLength(0);
    });
    // Уменьшение значения
    it('should decrement value when - button is clicked', () => {
        const mockOnChange = vi.fn();
        render(<QuantityStepper value={2} onChange={mockOnChange} />);

        const buttons = screen.getAllByRole('button');
        const decrementButton = buttons[0];
        fireEvent.click(decrementButton);

        expect(mockOnChange).toHaveBeenCalledWith(1);
    });
    // Тест на максимальное значение
    it('should not increment above max value', () => {
        const mockOnChange = vi.fn();
        render(<QuantityStepper value={10} onChange={mockOnChange} max={10} />);

        const buttons = screen.getAllByRole('button');
        fireEvent.click(buttons[1]);

        expect(mockOnChange).not.toHaveBeenCalled();
    });
    // Тест на disabled состояния
    it('should disable - button when at min value', () => {
        render(<QuantityStepper value={1} onChange={() => {}} min={1} />);

        const buttons = screen.getAllByRole('button');
        expect(buttons[0]).toBeDisabled();
    });
});