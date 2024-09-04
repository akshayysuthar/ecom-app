import React from 'react';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

const Product = ({ product: { image, name, slug, price } }) => {


  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          {image ? (
            <img 
              src={image}
              width={250}
              height={250}
              className="product-image"
              alt={name}
            />
          ) : (
            <div className="placeholder-image" style={{ width: 250, height: 250, backgroundColor: '#ccc' }}>
              Image Not Available
            </div>
          )}
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
}

export default Product;
