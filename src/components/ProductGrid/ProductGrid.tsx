import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import {ProductGridProps} from '../../types/types'

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart }) => {
    return (
        <div
            style={{
                width: '1280px',
                height: '3508px',
                opacity: 1,
                position: 'absolute',
                top: '208px',
                left: '80px',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '24px',
            }}
        >
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                />
            ))}
        </div>
    );
};

export default ProductGrid;