import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session)
    return (
      <p>
        Please <Link href="/login">sign in</Link>.
      </p>
    );

  return (
    <div className="p-6">
      <h1 className="text-3xl">
        Welcome, {session.user.name || session.user.email}
      </h1>
      <pre className="mt-4 bg-gray-100 p-4 rounded">
        {JSON.stringify(session.user, null, 2)}
      </pre>
    </div>
  );
}
