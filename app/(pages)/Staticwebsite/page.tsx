import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import LayoutWrapper from '@/app/components/LayoutWrapper';

const Uiux = dynamic(() => import('@/app/components/Pages/Service/Uiux'), {
  loading: () => <div className="flex justify-center items-center h-screen">Loading...</div>,
  ssr: true,
});

export const metadata: Metadata = {
  title: "UI/UX Design - EXCERPT TECHNOLOGIES PRIVATE LIMITED - Software As A Service Provider | Best Software Solution Provider",
  description: "Excerpt Technologies Private Limited specializes in UI/UX design, creating user-centered interfaces that enhance user experience and engagement.",
};

export default function StaticwebsitePage() {
  return (
    <LayoutWrapper>
      <Uiux />
    </LayoutWrapper>
  );
}

