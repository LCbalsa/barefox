// app/checkout/page.tsx
"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";

import { createPaymentIntent } from "./checkout-action";
import { ShippingForm } from "./ShippingForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutForm() {
  const { items, removeItem, addItem } = useCartStore();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Shipping form states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    try {
      const res = await createPaymentIntent(items, {
        fullName,
        phone,
        address,
        city,
        state,
        zip,
        country,
      });
      const clientSecret = res.client_secret;

      if (!clientSecret) {
        setError("Payment initialization failed.");
        setLoading(false);
        return;
      }

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
                <div className="flex items-center gap-4">
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="object-cover"
                      priority
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-700">{item.name}</span>
                    <span className="font-semibold text-gray-900">
                      ${((item.price * item.quantity) / 100).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
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
        <ShippingForm
          fullName={fullName}
          setFullName={setFullName}
          phone={phone}
          setPhone={setPhone}
          address={address}
          setAddress={setAddress}
          city={city}
          setCity={setCity}
          state={state}
          setState={setState}
          zip={zip}
          setZip={setZip}
          country={country}
          setCountry={setCountry}
        />

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
