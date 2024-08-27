import React from 'react';

// Sample data for products
const products = [
  { id: 1, name: 'Product A', price: 30 },
  { id: 2, name: 'Product B', price: 20 },
  { id: 3, name: 'Product C', price: 50 },
  { id: 4, name: 'Product D', price: 40 },
  { id: 5, name: 'Product E', price: 10 },
];

// Function to get top N products
const getTopNProducts = (n) => {
  return products.sort((a, b) => b.price - a.price).slice(0, n);
};

const ProductList = ({ topN }) => {
  const topProducts = getTopNProducts(topN);

  return (
    <div>
      <h2>Top {topN} Products</h2>
      <ul>
        {topProducts.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
