"use client";

import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="p-4 bg-blue-500 text-white">
      <ul className="flex space-x-4">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/courses">Courses</Link></li>
        <li><Link href="/mediaExperts">Media Experts</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;