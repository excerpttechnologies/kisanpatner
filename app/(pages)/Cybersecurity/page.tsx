import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import LayoutWrapper from '@/app/components/LayoutWrapper';

const Cybersecurity = dynamic(() => import('@/app/components/Pages/Service/Cybersecurity'), {
  loading: () => <div className="flex justify-center items-center h-screen">Loading...</div>,
  ssr: true,
});

export const metadata: Metadata = {
  title: "Cyber Security - EXCERPT TECHNOLOGIES PRIVATE LIMITED - Software As A Service Provider | Best Software Solution Provider",
  description: "Excerpt Technologies Private Limited provides comprehensive Cyber Security services to protect your business from cyber threats, ensuring data security and uninterrupted operations.",
};

export default function CybersecurityPage() {
  return (
    <LayoutWrapper>
      <Cybersecurity />
    </LayoutWrapper>
  );
}

