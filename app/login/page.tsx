"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { error: authError } = await authClient.signIn.email({
        email,
        password,
      });

      if (authError) {
        console.log("Login error:", authError);

        // Handle different types of authentication errors
        switch (authError.code) {
          case "INVALID_PASSWORD":
            setError(
              "Invalid password. Please check your password and try again."
            );
            break;
          case "USER_NOT_FOUND":
            setError("No account found with this email address.");
            break;
          case "INVALID_EMAIL":
            setError("Please enter a valid email address.");
            break;
          case "TOO_MANY_REQUESTS":
            setError("Too many login attempts. Please try again later.");
            break;
          default:
            setError(authError.message || "Login failed. Please try again.");
        }
      } else {
        // Login successful
        router.push("/dashboard");
      }
    } catch (err) {
      console.log("Unexpected login error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    try {
      setError("");
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
      });
    } catch (err) {
      console.log("GitHub login error:", err);
      setError("GitHub login failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h1 className="text-2xl mb-4">Sign In</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleEmailLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          disabled={isLoading}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          disabled={isLoading}
          required
        />
        <button
          type="submit"
          disabled={isLoading || !email || !password}
          className={`w-full p-2 rounded text-white ${
            isLoading || !email || !password
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <button
        onClick={handleGithubLogin}
        disabled={isLoading}
        className={`mt-4 w-full p-2 rounded text-white ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gray-800 hover:bg-gray-900"
        }`}
      >
        {isLoading ? "Loading..." : "Sign in with Github"}
      </button>

      <p className="mt-2 text-center">
        <Link href="/signup" className="text-blue-600 hover:underline">
          Create an account
        </Link>
        <span className="mx-2">|</span>
        <Link href="/forgot-password" className="text-blue-600 hover:underline">
          Forgot Password?
        </Link>
      </p>
    </div>
  );
}
