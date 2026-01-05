'use client';

import { useAuth } from '@/app/providers';
import Navbar from '@/app/components/Navbar/Navbar';
import Footer from '@/app/components/Footer/Footer';
import Whatsapp from '@/app/components/whatsapp/Whatsapp';
import ScrollToTopButton from '@/app/components/Scroll-up/ScrollTop';

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

