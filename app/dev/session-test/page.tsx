"use client";

import { useSession } from "next-auth/react";

export default function SessionTestPage() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Session Test</h1>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Client-Side Session Data:</h2>
          <div className="bg-gray-100 p-4 rounded text-sm font-mono">
            <p><strong>Status:</strong> {status}</p>
            {session && session.user && (
              <>
                <p><strong>User ID:</strong> {(session.user as any).id}</p>
                <p><strong>Email:</strong> {session.user.email}</p>
                <p><strong>Name:</strong> {session.user.name}</p>
                <p><strong>Role:</strong> {(session.user as any).role}</p>
              </>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">How to Check Server-Side:</h2>
          <div className="bg-blue-50 p-4 rounded text-sm">
            <ol className="list-decimal list-inside space-y-1">
              <li>Open <strong>Developer Tools</strong> (F12)</li>
              <li>Go to <strong>Application/Storage → Cookies</strong></li>
              <li>Look for <code>next-auth.session-token</code> (HTTP-only)</li>
              <li>This is the JWT stored server-side</li>
              <li>Client-side gets session data from this token</li>
            </ol>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Server-Side API Call:</h2>
          <div className="bg-green-50 p-4 rounded text-sm">
            <p>Visit: <code>/api/auth/session</code></p>
            <p>This endpoint returns server-side session data</p>
          </div>
        </div>

        {!session && (
          <div className="text-center">
            <a href="/dev/login" className="text-blue-600 hover:underline">
              Login to test session
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
