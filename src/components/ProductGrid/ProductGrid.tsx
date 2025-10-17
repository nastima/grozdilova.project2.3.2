import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import {ProductGridProps} from '../../types/types'

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart, loading = false  }) => {
    const displayProducts = loading
        ? Array(8).fill({ id: 'loading', name: '', price: 0, image: '' })
        : products;
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
            {displayProducts.map((product, index) => (
                <ProductCard
                    key={loading ? `loading-${index}` : product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    isLoading={loading}
                />
            ))}
        </div>
    );
};

export default ProductGrid;