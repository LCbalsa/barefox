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
  const amount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
    },
  });

  return paymentIntent;
};
