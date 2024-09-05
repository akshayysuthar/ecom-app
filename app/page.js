"use client";
import React, { useEffect, useState } from "react";
import FooterBanner from "@/components/FooterBanner";
import HeroBanner from "@/components/HeroBanner";
import Product from "@/components/Product";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { BackgroundBeams } from "@/components/ui/background-beams";

async function fetchProductsAndBanners() {
  const productQuery = `*[_type == "product"] | order(_createdAt desc)`;
  const bannerQuery = `*[_type == "banner"] | order(_createdAt desc)[0...19]`;

  const products = await client.fetch(productQuery);
  const banners = await client.fetch(bannerQuery);

  const processedBanners = banners.map((banner) => ({
    ...banner,
    image: banner.image ? urlFor(banner.image).url() : "",
  }));

  const processedProducts = products.map((product) => ({
    ...product,
    image: product.image ? urlFor(product.image[0]).url() : "",
  }));

  return { products: processedProducts, banners: processedBanners };
}

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const fetchAndUpdateData = async () => {
    const { products: newProducts, banners: newBanners } =
      await fetchProductsAndBanners();
    setProducts(newProducts);
    setBanners(newBanners);
  };

  useEffect(() => {
    fetchAndUpdateData(); // Initial fetch

    const dataIntervalId = setInterval(() => {
      fetchAndUpdateData();
    }, 5000); // Fetch new data every 5 seconds

    return () => clearInterval(dataIntervalId); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    if (banners.length > 0) {
      const bannerIntervalId = setInterval(() => {
        setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }, 5000); // Change banner every 5 seconds

      return () => clearInterval(bannerIntervalId); // Cleanup interval on component unmount
    }
  }, [banners]);

  if (!banners.length || !products.length) return <p>Loading...</p>;

  return (
    <div>
      <BackgroundBeams />

      <HeroBanner heroBanner={banners[currentBannerIndex]} />
      <div className="products-heading">
        <h2>Best Seller Products</h2>
        <p>There are many variations of passages</p>
      </div>
      <div className="products-container">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={banners[currentBannerIndex]} />
    </div>
  );
}
