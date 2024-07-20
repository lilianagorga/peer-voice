import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from '../lib/utils';
import Navbar from '../components/Navbar';
import { ThemeProvider } from "next-themes";
import Footer from "../components/Footer";
import { AuthProvider } from "../context/AuthContext";

const fontSans = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700'], variable: '--font-sans' });

export const metadata: Metadata ={
  title: 'Peer Voice',
  description: 'Generated by Liliana Gorga',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={cn('min-h-screen bg-dark-300 font-sans antialiased', fontSans.variable)} suppressHydrationWarning={true}>
      <ThemeProvider attribute="class" defaultTheme="dark">
      <AuthProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </AuthProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}