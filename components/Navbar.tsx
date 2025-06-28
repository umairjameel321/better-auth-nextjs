"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex space-x-6">
          <Link href="/" className="text-lg font-semibold hover:text-blue-600">
            Home
          </Link>
          {session && (
            <>
              <Link
                href="/dashboard"
                className="text-lg font-semibold hover:text-blue-600"
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className="text-lg font-semibold hover:text-blue-600"
              >
                Profile
              </Link>
            </>
          )}
        </div>

        <div>
          {isPending ? (
            <span className="text-gray-500">Checking…</span>
          ) : session ? (
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
