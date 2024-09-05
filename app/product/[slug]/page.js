"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image"; // Ensure correct import
import { useStateContext } from "@/context/StateContext";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

export default function ProductPage({ params }) {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(0);

  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const slug = params.slug;

  useEffect(() => {
    if (slug) {
      const fetchProductDetails = async () => {
        const query = `*[_type == "product" && slug.current == $slug][0]`;
        const params = { slug };

        try {
          const fetchedProduct = await client.fetch(query, params);
          setProduct(fetchedProduct);
        } catch (error) {
          setError("Failed to fetch product details.");
        } finally {
          setLoading(false);
        }
      };

      fetchProductDetails();
    } else {
      setLoading(false);
    }
  }, [slug]);

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  if (!product) return <p>Product not found</p>;

  // Handle the images array
  const images = product.image?.map((img) => urlFor(img).url()) || [];
  return (
    <>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={images[index]} // Display the image based on the current index
              alt={product.name}
              className="product-detail-image"
            />
          </div>

          <div className="small-images-container">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Thumbnail ${i}`}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{product.name}</h1>
          <div className="reviews">
            <AiFillStar /> <AiFillStar /> <AiFillStar /> <AiFillStar />{" "}
            <AiOutlineStar />
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{product.details}</p>
          <p className="price">${product.price}</p>

          <div className="quantity">
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
          </div>
          <div className="buttons">
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
          </div>
        </div>
      </div>
    </>
  );
}
