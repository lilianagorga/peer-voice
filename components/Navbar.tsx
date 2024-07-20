"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const router = useRouter();
  const { userId, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="p-4 bg-blue-500 text-white">
      <ul className="flex space-x-4">
        <li><Link href="/">Home</Link></li>
        {userId ? (
          <>
            <li><Link href={`/mediaExperts/${userId}/admin`}>Admin</Link></li>
            <li><Link href={`/mediaExperts/${userId}/team`}>Team</Link></li>
            <li><button onClick={handleLogout} className="text-white">Logout</button></li>
          </>
        ) : (
          <li><Link href="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;