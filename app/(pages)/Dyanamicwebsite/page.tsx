import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import LayoutWrapper from'@/app/components/LayoutWrapper';

const DynamicWebsites = dynamic(() => import('@/app/components/Pages/Service/Dyanamic'), {
  loading: () => <div className="flex justify-center items-center h-screen">Loading...</div>,
  ssr: true,
});

export const metadata: Metadata = {
  title: "Dynamic Websites - EXCERPT TECHNOLOGIES PRIVATE LIMITED",
  description: "Explore our dynamic website solutions for a more interactive online presence.",
};

export default function DyanamicwebsitePage() {
  return (
    <LayoutWrapper>
      <DynamicWebsites />
    </LayoutWrapper>
  );
}

