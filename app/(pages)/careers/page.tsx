import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import LayoutWrapper from '@/app/components/LayoutWrapper';

const Carrers = dynamic(() => import('@/app/components/Carriers/Carrers'), {
  loading: () => <div className="flex justify-center items-center h-screen">Loading...</div>,
  ssr: true,
});

export const metadata: Metadata = {
  title: "Careers - EXCERPT TECHNOLOGIES PRIVATE LIMITED - Software As A Service Provider | Best Software Solution Provider",
  description: "Join Excerpt Technologies Private Limited and explore exciting career opportunities in the software industry. We are looking for talented individuals to be part of our dynamic team.",
};

export default function CareersPage() {
  return (
    <LayoutWrapper>
      <Carrers />
    </LayoutWrapper>
  );
}

