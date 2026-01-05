import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import LayoutWrapper from '@/app/components/LayoutWrapper';

const Seo = dynamic(() => import('@/app/components/Pages/Service/Seo'), {
  loading: () => <div className="flex justify-center items-center h-screen">Loading...</div>,
  ssr: true,
});

export const metadata: Metadata = {
  title: "SEO Analytics - EXCERPT TECHNOLOGIES PRIVATE LIMITED - Software As A Service Provider | Best Software Solution Provider",
  description: "Excerpt Technologies Private Limited offers expert SEO Analytics services to enhance your online visibility and drive organic traffic.",
};

export default function SeoPage() {
  return (
    <LayoutWrapper>
      <Seo />
    </LayoutWrapper>
  );
}

