import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import LayoutWrapper from '@/app/components/LayoutWrapper';

const DigitalMarketing = dynamic(() => import('@/app/components/Pages/Service/DigitalMarketing'), {
  loading: () => <div className="flex justify-center items-center h-screen">Loading...</div>,
  ssr: true,
});

export const metadata: Metadata = {
  title: "Digital Marketing - EXCERPT TECHNOLOGIES PRIVATE LIMITED - Software As A Service Provider | Best Software Solution Provider",
  description: "Excerpt Technologies Private Limited provides expert Digital Marketing services to enhance your online presence, drive traffic, and boost conversions through tailored strategies.",
};

export default function DigitalMarketingPage() {
  return (
    <LayoutWrapper>
      <DigitalMarketing />
    </LayoutWrapper>
  );
}
