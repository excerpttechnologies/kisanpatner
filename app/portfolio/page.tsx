import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import LayoutWrapper from '@/components/LayoutWrapper';

const Portfolio = dynamic(() => import('@/components/Portfolio/Portfolio'), {
  loading: () => <div className="flex justify-center items-center h-screen">Loading...</div>,
  ssr: true,
});

export const metadata: Metadata = {
  title: "Portfolio - EXCERPT TECHNOLOGIES PRIVATE LIMITED - Software As A Service Provider | Best Software Solution Provider",
  description: "Explore our portfolio of successful projects and solutions delivered by Excerpt Technologies Private Limited.",
};

export default function PortfolioPage() {
  return (
    <LayoutWrapper>
      <Portfolio />
    </LayoutWrapper>
  );
}

