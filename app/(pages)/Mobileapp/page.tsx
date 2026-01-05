import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import LayoutWrapper from '@/app/components/LayoutWrapper';

const Mobileapp = dynamic(() => import('@/app/components/Pages/Service/Mobileapp'), {
  loading: () => <div className="flex justify-center items-center h-screen">Loading...</div>,
  ssr: true,
});

export const metadata: Metadata = {
  title: "Mobile Application Development - EXCERPT TECHNOLOGIES PRIVATE LIMITED - Software As A Service Provider | Best Software Solution Provider",
  description: "Excerpt Technologies Private Limited offers expert Mobile Application Development services, creating custom iOS and Android apps that prioritize performance, usability, and innovation.",
};

export default function MobileappPage() {
  return (
    <LayoutWrapper>
      <Mobileapp />
    </LayoutWrapper>
  );
}

