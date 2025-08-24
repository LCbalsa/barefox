// app/checkout/checkout-action.ts
"use server";

import { stripe } from "@/lib/stripe";
import { CartItem } from "@/store/cart-store";

export const createPaymentIntent = async (items: CartItem[]) => {
  const amount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "cad",
    automatic_payment_methods: { enabled: true },
  });

  return paymentIntent; // { client_secret, id, ... }
};
