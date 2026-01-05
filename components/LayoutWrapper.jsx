'use client';

import { useAuth } from '@/app/providers';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import Whatsapp from '@/components/whatsapp/Whatsapp';
import ScrollToTopButton from '@/components/Scroll-up/ScrollTop';

export default function LayoutWrapper({ children }) {
  const { isLoggedIn, isAdmin, handleLogout } = useAuth();
  
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogout={handleLogout} />
      {children}
      <Whatsapp />
      <ScrollToTopButton />
      <Footer />
    </>
  );
}

