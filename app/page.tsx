import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import LayoutWrapper from '@/app/components/LayoutWrapper';

// Lazy load Home component
const Home = dynamic(() => import('@/app/components/Home/Home'), {
  loading: () => <div className="flex justify-center items-center h-screen">Loading...</div>,
  ssr: true,
});

export const metadata: Metadata = {
  title: "EXCERPT TECHNOLOGIES PRIVATE LIMITED - Software As A Service Provider | Best Software Solution Provider",
  description: "Welcome to Excerpt Technologies Private Limited. We specialize in Web Design & Development, E-commerce Solutions, Data Analytics, and BI Report Generation.",
};

export default function HomePage() {
  return (
    <LayoutWrapper>
      <Home />
    </LayoutWrapper>
  );
}
