// app/login/page.tsx
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (loginError) {
      setError(getFriendlyError(loginError.message));
      setLoading(false);
      return;
    }

    // Call API route to set HTTP-only cookie
    const res = await fetch("/api/auth/callback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ access_token: data.session?.access_token }),
    });

    if (!res.ok) {
      setError("Failed to save session");
      setLoading(false);
      return;
    }

    setSuccess("Login successful! Redirecting...");
    setTimeout(() => {
      window.location.href = "/"; // <-- force full page reload
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center mt-2 text-sm">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="text-blue-600 hover:underline">
          Sign Up
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
  if (message.includes("Invalid login credentials")) {
    return "Invalid email or password.";
  }
  if (message.toLowerCase().includes("password")) {
    return "Password must be at least 6 characters.";
  }
  return "Something went wrong. Please try again.";
}
