import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import LayoutWrapper from '@/app/components/LayoutWrapper';

const Waecom = dynamic(() => import('@/app/components/Pages/Service/Waecom'), {
  loading: () => <div className="flex justify-center items-center h-screen">Loading...</div>,
  ssr: true,
});

export const metadata: Metadata = {
  title: "WhatsApp E-Commerce - EXCERPT TECHNOLOGIES PRIVATE LIMITED",
  description: "Explore our WhatsApp E-Commerce solutions for seamless online shopping.",
};

export default function WhatsappEcommercePage() {
  return (
    <LayoutWrapper>
      <Waecom />
    </LayoutWrapper>
  );
}

