"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, isPending, error } = authClient.useSession();

  // Show loading state while session is being fetched
  if (isPending) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Show error state if there's an error
  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error loading session: {error.message}</p>
        </div>
      </div>
    );
  }

  // Show login prompt if no session
  if (!session) {
    return (
      <div className="p-6">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>
            You are not logged in. Please{" "}
            <Link href="/login" className="text-blue-600 underline">
              sign in
            </Link>{" "}
            to view your profile.
          </p>
        </div>
      </div>
    );
  }

  // Show user profile data
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Client-Side Profile
        </h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            Welcome, {session.user.name || session.user.email}!
          </h2>
          <p className="text-gray-600">
            This page demonstrates fetching user session data in a client
            component.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* User Information Card */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              User Information
            </h3>
            <div className="space-y-2">
              <div>
                <span className="font-medium text-gray-600">Name:</span>
                <span className="ml-2 text-gray-800">
                  {session.user.name || "Not provided"}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Email:</span>
                <span className="ml-2 text-gray-800">{session.user.email}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">User ID:</span>
                <span className="ml-2 text-gray-800 font-mono text-sm">
                  {session.user.id}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600">
                  Email Verified:
                </span>
                <span className="ml-2 text-gray-800">
                  {session.user.emailVerified ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>

          {/* Session Information Card */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Session Information
            </h3>
            <div className="space-y-2">
              <div>
                <span className="font-medium text-gray-600">Session ID:</span>
                <span className="ml-2 text-gray-800 font-mono text-sm">
                  {session.session.id}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Expires At:</span>
                <span className="ml-2 text-gray-800">
                  {new Date(session.session.expiresAt).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Created At:</span>
                <span className="ml-2 text-gray-800">
                  {new Date(session.session.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Raw Session Data */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            Raw Session Data (JSON)
          </h3>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>

        {/* Navigation Links */}
        <div className="mt-6 flex gap-4">
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Go to Dashboard (Server Component)
          </Link>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
