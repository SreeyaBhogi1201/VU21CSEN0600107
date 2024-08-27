import React from 'react';
import ProductList from './components/ProductList';

const HomePage = () => {
  return (
    <div>
      <h1>Top N Products Application</h1>
      <ProductList topN={3} />
    </div>
  );
};

export default HomePage;
