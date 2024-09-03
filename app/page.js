import { HeroBanner, Product } from "@/components";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

async function fetchProductsAndBanners() {
  const productQuery = `*[_type == "product"]{_id, title, price, image, "slug": slug.current}`;
  const bannerQuery = `*[_type == "banner"]{_id, title, image, smallText, midText, largeText1, buttonText, product, desc}`;

  const products = await client.fetch(productQuery);
  const banners = await client.fetch(bannerQuery);

  // Ensure that image data is correctly formatted and convert images to URLs
  const processedBanners = banners.map(banner => ({
    ...banner,
    image: urlFor(banner.image).url(),  // Convert image object to URL string
  }));

  const processedProducts = products.map(product => ({
    ...product,
    image: urlFor(product.image),  // Ensure you're accessing the correct image if it's an array
  }));

  return { products: processedProducts, banners: processedBanners };
}

export default async function HomePage() {
  const { products, banners } = await fetchProductsAndBanners();

  return (
    <div>
      <HeroBanner heroBanner={banners[0]} /> {/* Ensure banners[0] exists and is a plain object */}

      <div className="products-heading">
        <h2>Best Seller Products</h2>
        <p>There are many variations of passages</p>
      </div>

      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
