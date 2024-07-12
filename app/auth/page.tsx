'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function LoginPage() {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        <>
          <p>You are not logged in.</p>
          <button onClick={() => signIn('github')}>Log in with GitHub</button>
        </>
      ) : (
        <>
          <p>Welcome, {session.user?.name}!</p>
          <button onClick={() => signOut()}>Log out</button>
        </>
      )}
    </div>
  );
}