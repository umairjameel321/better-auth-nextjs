"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const handleRequest = async () => {
    if (!email) {
      setMessage("Please enter your email address");
      setMessageType("error");
      return;
    }

    setIsLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const { error } = await authClient.requestPasswordReset({
        email,
        redirectTo: "/reset-password",
      });

      if (error) {
        console.log("Password reset error:", error);
        setMessage(`Error: ${error.message || "Failed to send reset email"}`);
        setMessageType("error");
      } else {
        setMessage(
          "Password reset email sent! Check your inbox and spam folder."
        );
        setMessageType("success");
        setEmail(""); // Clear email field on success
      }
    } catch (err) {
      console.log("Unexpected error:", err);
      setMessage("An unexpected error occurred. Please try again.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h1 className="text-2xl mb-4">Forgot Password</h1>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            messageType === "success"
              ? "bg-green-100 border border-green-400 text-green-700"
              : "bg-red-100 border border-red-400 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <input
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        disabled={isLoading}
        required
      />

      <button
        onClick={handleRequest}
        disabled={isLoading || !email}
        className={`w-full p-2 rounded text-white ${
          isLoading || !email
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isLoading ? "Sending..." : "Send Reset Link"}
      </button>

      <div className="mt-4 text-sm text-gray-600">
        <p>• Check your spam/junk folder if you dont see the email</p>
        <p>• The reset link will expire in 1 hour</p>
        <p>• Make sure the email address is correct</p>
      </div>
    </div>
  );
}
