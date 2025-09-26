// app/checkout/ShippingForm.tsx
"use client";

import React from "react";

interface ShippingFormProps {
  fullName: string;
  setFullName: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  state: string;
  setState: (value: string) => void;
  zip: string;
  setZip: (value: string) => void;
  country: string;
  setCountry: (value: string) => void;
}

export const ShippingForm: React.FC<ShippingFormProps> = ({
  fullName,
  setFullName,
  phone,
  setPhone,
  address,
  setAddress,
  city,
  setCity,
  state,
  setState,
  zip,
  setZip,
  country,
  setCountry,
}) => {
  return (
    <div className="space-y-4">
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

      <input
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => {
          const value = e.target.value.replace(/[^\d+()\-\s]/g, "");
          setPhone(value);
        }}
        className="w-full p-2 border rounded-md"
        required
        inputMode="tel"
        maxLength={20}
        title="Enter a valid phone number, including country code if needed"
      />

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

      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="w-full p-2 border rounded-md"
        required
      >
        <option value="">Select Country</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="MX">Mexico</option>
        <option value="GB">United Kingdom</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option>
        <option value="IT">Italy</option>
        <option value="ES">Spain</option>
        <option value="CN">China</option>
        <option value="JP">Japan</option>
        <option value="IN">India</option>
        <option value="KR">South Korea</option>
        <option value="SG">Singapore</option>
        <option value="TH">Thailand</option>
        <option value="MY">Malaysia</option>
        <option value="VN">Vietnam</option>
        <option value="AE">United Arab Emirates</option>
        <option value="SA">Saudi Arabia</option>
        <option value="IQ">Iraq</option>
        <option value="IR">Iran</option>
        <option value="IL">Israel</option>
        <option value="JO">Jordan</option>
        <option value="KW">Kuwait</option>
        <option value="OM">Oman</option>
        <option value="QA">Qatar</option>
        <option value="AU">Australia</option>
        <option value="NZ">New Zealand</option>
        <option value="ZA">South Africa</option>
        <option value="EG">Egypt</option>
        <option value="NG">Nigeria</option>
      </select>
    </div>
  );
};
