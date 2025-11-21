import React from 'react';
import './ProductTiles.css'
const products = [
  { id: 1, title: 'Giraffe', description: 'a large African animal with a very long neck and long legs'},
  { id: 2, title: 'Rude Cat', description: 'It has a strong, flexible body, quick reflexes, and sharp teeth, and its night vision and sense of smell are well developed.' },
  { id: 3, title: 'Beagle', description: 'A small breed of scent hound, similar in appearance to the much larger foxhound' },
];

const ProductTiles = () => {
  return (
    <section className="product-tiles-section">
      <div className="tiles-grid">
        {products.map(product => (
          <div className="product-tile" key={product.id}>
            <div className="tile-image-placeholder"></div>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
      <button className="view-more-button">View more</button>
    </section>
  );
};

export default ProductTiles;