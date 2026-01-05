import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import LayoutWrapper from '@/app/components/LayoutWrapper';

const Ecommerce = dynamic(() => import('@/app/components/Pages/Service/Ecommerce'), {
  loading: () => <div className="flex justify-center items-center h-screen">Loading...</div>,
  ssr: true,
});

export const metadata: Metadata = {
  title: "E-commerce - EXCERPT TECHNOLOGIES PRIVATE LIMITED - Software As A Service Provider | Best Software Solution Provider",
  description: "Excerpt Technologies Private Limited offers comprehensive E-commerce solutions to help businesses establish a strong online presence and drive sales.",
};

export default function EcommercePage() {
  return (
    <LayoutWrapper>
      <Ecommerce />
    </LayoutWrapper>
  );
}

