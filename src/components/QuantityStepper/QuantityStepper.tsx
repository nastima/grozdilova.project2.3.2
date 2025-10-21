import React from 'react';
import { ActionIcon, Badge, Group, useMantineTheme } from '@mantine/core';
import {QuantityStepperProps} from "../../types/types.ts";

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
    value,
    onChange,
    min = 1,
    max,
                                                                }) => {

    const theme = useMantineTheme();
    const [internalValue, setInternalValue] = React.useState<number>(value ?? 1);

    // Если значение приходит извне — синхронизируем
    React.useEffect(() => {
        if (value !== undefined) setInternalValue(value);
    }, [value]);

    const handleDecrement = () => {
        const newValue = Math.max(min, internalValue - 1);
        setInternalValue(newValue);
        onChange?.(newValue);
    };

    const handleIncrement = () => {
        const newValue = max ? Math.min(max, internalValue + 1) : internalValue + 1;
        setInternalValue(newValue);
        onChange?.(newValue);
    };

    return (
        <Group
            style={{
                display: 'flex',
                width: '90px',
                height: '30px',
            }}
        >
            <ActionIcon
                onClick={handleDecrement}
                data-testid="decrement-btn"
                styles={{
                    root: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="2"
                    fill="none"
                    style={{ display: 'block' }}
                >
                    <path fill={theme.colors.gray[10]} d="M0 2V0h12v2z" />
                </svg>
            </ActionIcon>

            <Badge variant="clear" data-testid="quantity-value">{internalValue}</Badge>

            <ActionIcon
                onClick={handleIncrement}
                data-testid="increment-btn"
                styles={{
                    root: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="none"
                >
                    <path fill={theme.colors.gray[10]} d="M7 0H5v5H0v2h5v5h2V7h5V5H7z" />
                </svg>
            </ActionIcon>
        </Group>
    );
};