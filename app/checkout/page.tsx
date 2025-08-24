// app/checkout/page.tsx
"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";

import { createPaymentIntent } from "./checkout-action"; // we'll update this

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutForm() {
  const { items, removeItem, addItem } = useCartStore();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    try {
      // 1️⃣ Create PaymentIntent on server
      const res = await createPaymentIntent(items);
      const clientSecret = res.client_secret;

      if (!clientSecret) {
        setError("Payment initialization failed.");
        setLoading(false);
        return;
      }

      // 2️⃣ Confirm Card Payment
      const cardElement = elements.getElement(CardElement)!;
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (stripeError) {
        setError(stripeError.message || "Payment failed");
        setLoading(false);
      } else if (paymentIntent?.status === "succeeded") {
        window.location.href = "/success";
      }
    } catch (err) {
      setError("Payment failed. Try again. " + err);
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

      <Card className="max-w-md mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Order <span className="text-orange-500">Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex flex-col gap-2 border-b pb-2">
                <div className="flex justify-between">
                  <span className="font-medium">{item.name}</span>
                  <span className="font-semibold">${((item.price * item.quantity) / 100).toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="cursor-pointer hover:bg-orange-500 hover:text-white transition-colors duration-300"
                  >
                    –
                  </Button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addItem({ ...item, quantity: 1 })}
                    className="cursor-pointer hover:bg-orange-500 hover:text-white transition-colors duration-300"
                  >
                    +
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t pt-2 text-lg font-semibold">Total: ${(total / 100).toFixed(2)}</div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <CardElement className="p-4 border rounded-md" />
        {error && <p className="text-red-500">{error}</p>}
        <Button
          type="submit"
          variant="default"
          className="w-full hover:bg-orange-500 transition-colors duration-300 cursor-pointer"
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </Button>
      </form>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
