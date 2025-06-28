"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ResetPassword() {
  const params = useSearchParams();
  const token = params.get("token") || "";
  const router = useRouter();
  const [newPass, setNewPass] = useState("");
  const handleReset = async () => {
    const { error } = await authClient.resetPassword({
      token,
      newPassword: newPass,
    });
    if (!error) router.push("/login");
  };
  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h1 className="text-2xl mb-4">Reset Password</h1>
      <input
        type="password"
        placeholder="New Password"
        value={newPass}
        onChange={(e) => setNewPass(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleReset}
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Update Password
      </button>
    </div>
  );
}
