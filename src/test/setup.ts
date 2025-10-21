import '@testing-library/jest-dom';
import '@testing-library/jest-dom/vitest';
import { beforeAll, vi } from 'vitest';

// Мок window.matchMedia для Mantine
beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(), // устаревшее
            removeListener: vi.fn(), // устаревшее
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });
});