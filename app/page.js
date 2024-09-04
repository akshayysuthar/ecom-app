
import FooterBanner from "@/components/FooterBanner";
import HeroBanner from "@/components/HeroBanner";
import Product from "@/components/Product";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

async function fetchProductsAndBanners() {
  const productQuery = `*[_type == "product"]`;
  const bannerQuery = `*[_type == "banner"]`;

  const products = await client.fetch(productQuery);
  const banners = await client.fetch(bannerQuery);

  // Ensure that image data is correctly formatted and convert images to URLs
  const processedBanners = banners.map((banner) => ({
    ...banner,
    image: banner.image ? urlFor(banner.image).url() : "", // Convert image object to URL string
  }));

  const processedProducts = products.map((product) => ({
    ...product,
    image: product.image ? urlFor(product.image[0]).url() : "", // Ensure you're accessing the correct image
  }));

  return { products: processedProducts, banners: processedBanners };
}

export default async function HomePage() {
  const { products, banners } = await fetchProductsAndBanners();

  return (
    <div>
      {/* {console.log(banners, products)} */}
      <HeroBanner heroBanner={banners && banners[2]} />{" "}
      <div className="products-heading">
        <h2>Best Seller Products</h2>
        <p>There are many variations of passages</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={banners && banners[2]} />
    </div>
  );
}
