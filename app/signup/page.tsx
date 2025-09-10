// app/signup/page.tsx
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const supabase = createClient();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Step 1: Sign up in Supabase Auth
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (signUpError) {
      setError(getFriendlyError(signUpError.message));
      setLoading(false);
      return;
    }

    // Step 2: Insert into custom users table
    if (data.user) {
      const { error: insertError } = await supabase.from("users").insert([
        {
          id: data.user.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          username: formData.username,
          email: formData.email,
        },
      ]);

      if (insertError) {
        setError(getFriendlyError(insertError.message));
        setLoading(false);
        return;
      }

      // ✅ Success message
      setSuccess(
        "Signup successful! Please check your email to verify your account."
      );
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4">Create an account</h1>
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="w-full p-2 border rounded"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="w-full p-2 border rounded"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-2 border rounded"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <p className="text-center mt-2 text-sm">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Login
        </a>
      </p>

      {/* Display messages */}
      {error && <p className="text-red-600 mt-2">{error}</p>}
      {success && <p className="text-green-600 mt-2">{success}</p>}
    </div>
  );
}

/**
 * Convert raw Supabase errors into user-friendly messages.
 */
function getFriendlyError(message: string): string {
  if (
    message.includes("duplicate key value") &&
    message.includes("users_username_key")
  ) {
    return "That username is already taken. Please choose another.";
  }
  if (
    message.includes("duplicate key value") &&
    message.includes("users_email_key")
  ) {
    return "An account with this email already exists. Try logging in.";
  }
  if (message.toLowerCase().includes("password")) {
    return "Password must be at least 6 characters long.";
  }
  return "Something went wrong. Please try again.";
}
