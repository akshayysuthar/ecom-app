import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    // Parse the request body
    const body = await req.json();

    // Log incoming data for debugging
    console.log("Request Body:", body);

    // Validate the request body
    if (!Array.isArray(body) || body.length === 0) {
      return new NextResponse("Invalid request payload", { status: 400 });
    }

    // Construct the parameters for Stripe Checkout
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ['card'],
      billing_address_collection: "auto",
      shipping_options: [{ shipping_rate: "shr_1PveYGInzg3TNCBLB8vP9iWd" }],
      line_items: body.map((item) => {
        if (
          !item.name ||
          !item.price ||
          !item.quantity ||
          !item.image ||
          !item.image[0].asset._ref
        ) {
          throw new Error("Missing required item fields");
        }

        const img = item.image[0].asset._ref;
        const newImage = img
          .replace(
            "image-",
            "https://cdn.sanity.io/images/vfxfwnaw/production/"
          )
          .replace("-webp", ".webp");

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              images: [newImage],
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${req.headers.get("origin")}/success`,
      cancel_url: `${req.headers.get("origin")}/canceled`,
    };

    // Create Checkout Sessions from body params
    const session = await stripe.checkout.sessions.create(params);

    // Respond with the session information
    return NextResponse.json(session);
  } catch (err) {
    console.error("Stripe API Error:", err);
    return new NextResponse(`Error: ${err.message}`, {
      status: err.statusCode || 500,
    });
  }
}
