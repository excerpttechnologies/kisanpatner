import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import LayoutWrapper from '@/app/components/LayoutWrapper';

const Webdesign = dynamic(() => import('@/app/components/Pages/Service/Webdesign'), {
  loading: () => <div className="flex justify-center items-center h-screen">Loading...</div>,
  ssr: true,
});

export const metadata: Metadata = {
  title: "Web Design & Development | E-commerce Solutions | Excerpt Technologies",
  description: "Discover top-tier Web Design and Development, along with cutting-edge E-commerce Solutions at Excerpt Technologies. Our expert team delivers customized, responsive websites and powerful online stores to enhance your digital footprint. Get in touch to transform your business today!",
  keywords: "software solutions website, best website developers in bengaluru, best website developers for small business, ecommerce website developers, ecommerce website developers in bangalore, ecommerce website developers near me, website design & development services, website developers",
};

export default function WebdesignPage() {
  return (
    <LayoutWrapper>
      <Webdesign />
    </LayoutWrapper>
  );
}

