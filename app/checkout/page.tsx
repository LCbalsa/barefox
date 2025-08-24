// app/checkout/page.tsx
"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";

import { createPaymentIntent } from "./checkout-action"; // we'll update this

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutForm() {
  const { items, removeItem, addItem } = useCartStore();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          onBlur={() => setFullName(fullName.trim())}
          className="w-full p-2 border rounded-md"
          required
          maxLength={50}
          pattern="[A-Za-z\s'-]{1,50}"
          title="Name can contain letters, spaces, hyphens, and apostrophes"
        />

        {/* Phone Number */}
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => {
            // Allow digits, +, spaces, parentheses, and dashes
            const value = e.target.value.replace(/[^\d+()\-\s]/g, "");
            setPhone(value);
          }}
          className="w-full p-2 border rounded-md"
          required
          inputMode="tel"
          maxLength={20} // allows longer numbers with country codes
          title="Enter a valid phone number, including country code if needed"
        />

        {/* Address */}
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onBlur={() => setAddress(address.trim())}
          className="w-full p-2 border rounded-md"
          required
          maxLength={100}
        />

        {/* City */}
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onBlur={() => setCity(city.trim())}
          className="w-full p-2 border rounded-md"
          required
          maxLength={50}
        />

        {/* State / Province */}
        <input
          type="text"
          placeholder="State / Province"
          value={state}
          onChange={(e) => setState(e.target.value)}
          onBlur={() => setState(state.trim())}
          className="w-full p-2 border rounded-md"
          required
          maxLength={20}
          pattern="[A-Za-z\s'-]{1,20}"
          title="State/Province can contain letters, spaces, hyphens, and apostrophes"
        />

        {/* ZIP Code */}
        <input
          type="text"
          placeholder="ZIP Code"
          value={zip}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "").slice(0, 5);
            setZip(value);
          }}
          onBlur={() => {
            if (zip.length !== 5) alert("ZIP code should be exactly 5 digits");
          }}
          className="w-full p-2 border rounded-md"
          required
          maxLength={5}
          inputMode="numeric"
        />

        {/* Country */}
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        >
          <option value="">Select Country</option>

          {/* North America */}
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="MX">Mexico</option>

          {/* Europe */}
          <option value="GB">United Kingdom</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
          <option value="IT">Italy</option>
          <option value="ES">Spain</option>

          {/* Asia */}
          <option value="CN">China</option>
          <option value="JP">Japan</option>
          <option value="IN">India</option>
          <option value="KR">South Korea</option>
          <option value="SG">Singapore</option>
          <option value="TH">Thailand</option>
          <option value="MY">Malaysia</option>
          <option value="VN">Vietnam</option>

          {/* Middle East */}
          <option value="AE">United Arab Emirates</option>
          <option value="SA">Saudi Arabia</option>
          <option value="IQ">Iraq</option>
          <option value="IR">Iran</option>
          <option value="IL">Israel</option>
          <option value="JO">Jordan</option>
          <option value="KW">Kuwait</option>
          <option value="OM">Oman</option>
          <option value="QA">Qatar</option>

          {/* Oceania */}
          <option value="AU">Australia</option>
          <option value="NZ">New Zealand</option>

          {/* Africa */}
          <option value="ZA">South Africa</option>
          <option value="EG">Egypt</option>
          <option value="NG">Nigeria</option>
        </select>

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
