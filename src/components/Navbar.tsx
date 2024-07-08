"use client";

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  return (
    <nav className="p-4 bg-blue-500 text-white">
      <ul className="flex space-x-4">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/trainingPrograms">Training Programs</Link></li>
        <li><Link href="/contents">Contents</Link></li>
        {!session ? (
          <li><Link href="/auth">Login</Link></li>
        ) : (
          <li><button onClick={() => signOut()}>Logout</button></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;