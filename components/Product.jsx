import React from 'react';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

const Product = ({ product: { image, name, slug, price } }) => {
  // Ensure image is properly formatted

  return (
    <div>
      {slug ? (
        <Link href={`/product/${slug}`}>
          <div className="product-card">
            <img
              src={image}
              width={250}
              height={250}
              className="product-image"
              alt={name}
            />
            <p className="product-name">{name}</p>
            <p className="product-price">${price}</p>
          </div>
        </Link>
      ) : (
        <div className="product-card">
          <img
            src={imageUrl}
            width={250}
            height={250}
            className="product-image"
            alt={name}
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
          <p className="error">Product slug not available</p>
        </div>
      )}
    </div>
  );
};

export default Product;
