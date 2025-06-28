"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const defaultName = email.split("@")[0];
      const { error: authError } = await authClient.signUp.email({
        email,
        name: defaultName,
        password: pass,
      });

      if (authError) {
        console.log("Signup error:", authError);

        // Handle different types of signup errors
        switch (authError.code) {
          case "USER_EXISTS":
            setError(
              "An account with this email already exists. Please sign in instead."
            );
            break;
          case "WEAK_PASSWORD":
            setError(
              "Password is too weak. Please choose a stronger password."
            );
            break;
          case "INVALID_EMAIL":
            setError("Please enter a valid email address.");
            break;
          default:
            setError(
              authError.message || "Account creation failed. Please try again."
            );
        }
      } else {
        // Signup successful
        router.push("/dashboard");
      }
    } catch (err) {
      console.log("Unexpected signup error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h1 className="text-2xl mb-4">Sign Up</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSignup} className="space-y-4">
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
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="w-full p-2 border rounded"
          disabled={isLoading}
          required
          minLength={6}
        />
        <button
          type="submit"
          disabled={isLoading || !email || !pass}
          className={`w-full p-2 rounded text-white ${
            isLoading || !email || !pass
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Sign in here
        </Link>
      </p>
    </div>
  );
}
