"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";
import Product from "@/components/Product";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";


export default async function ProductPage({ params }) {

  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Destructure slug with a fallback to an empty string
  const slug = params.slug;

  useEffect(() => {
    if (slug) {
      const fetchProductDetails = async () => {
        const query = `*[_type == "product" && slug.current == $slug][0]`;
        const params = { slug };

        try {
          const fetchedProduct = await client.fetch(query, params);
          setProduct(fetchedProduct);
          console.log("Product Details:", fetchedProduct);
        } catch (error) {
          console.error("Error fetching product details:", error);
          setError("Failed to fetch product details.");
        } finally {
          setLoading(false);
        }
      };

      fetchProductDetails();
      console.log(product);
    } else {
      setLoading(false);
    }
  }, [slug]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  if (!product) return <p>Product not found</p>;

  return (
    <>
      <div>
        <div className="poduct-detail-container">
          <div>
            <div className="image-container">
              <img
                src="product.image"
                alt=""
                className="product-detail-image"
              />
            </div>
          </div>
          <div className="small-images-container">
            {/* {image?.map((item, i) => (
              <img
                key={i}
                src="item"
                alt=""
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))} */}
          </div>
          <div className="product-detail-desc">
            <h1>{product.name}</h1>
            <div className="reviews">
              <div>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
              </div>
              <p>(20)</p>
            </div>
            <h4>Details: </h4>
            <p>{product.details}</p>
            <p className="price">${product.price}</p>
            {/* <div className="quantity">
              <h3>Quantity:</h3>
              <p className="quantity-desc">
                <span className="minus" onClick={decQty}>
                  <AiOutlineMinus />
                </span>
                <span className="num">{qty}</span>
                <span className="plus" onClick={incQty}>
                  <AiOutlinePlus />
                </span>
              </p>
            </div> */}
            {/* <div className="buttons">
              <button
                type="button"
                className="add-to-cart"
                onClick={() => onAdd(product, qty)}
              >
                Add to Cart
              </button>
              <button type="button" className="buy-now" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div> */}
          </div>
        </div>

        {/* <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
        </div> */}
      </div>
      <div>
        <h1>{product.name}</h1>
        <p>{product.details}</p>
        <p>${product.price}</p>
        {/* Render product images or other details as needed */}
      </div>
    </>
  );
}
