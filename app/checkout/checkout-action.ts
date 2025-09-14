// app/checkout/checkout-action.ts
"use server";

import { stripe } from "@/lib/stripe";
import { CartItem } from "@/store/cart-store";

export const createPaymentIntent = async (
  items: CartItem[],
  customerInfo: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  }
) => {
  // Calculate total amount
  const amount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Prepare product metadata (id, quantity, price only)
  const productsMetadata: Record<string, string> = {};
  items.forEach((item, index) => {
    const i = index + 1;
    productsMetadata[`product_${i}_id`] = item.id;
    productsMetadata[`product_${i}_quantity`] = item.quantity.toString();
    productsMetadata[`product_${i}_price`] = item.price.toString();
  });

  // Create the payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "cad",
    automatic_payment_methods: { enabled: true },
    metadata: {
      full_name: customerInfo.fullName,
      phone: customerInfo.phone,
      address: customerInfo.address,
      city: customerInfo.city,
      state: customerInfo.state,
      zip: customerInfo.zip,
      country: customerInfo.country,
      ...productsMetadata,
    },
  });

  // Return only plain JSON data (no Stripe class instance)
  return {
    client_secret: paymentIntent.client_secret,
    id: paymentIntent.id,
    amount: paymentIntent.amount,
    currency: paymentIntent.currency,
    metadata: paymentIntent.metadata,
    status: paymentIntent.status,
    created: paymentIntent.created,
  };
};
