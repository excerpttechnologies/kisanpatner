import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import LayoutWrapper from'@/app/components/LayoutWrapper';

const CustomizedWebsites = dynamic(() => import('@/app/components/Pages/Service/Customized'), {
  loading: () => <div className="flex justify-center items-center h-screen">Loading...</div>,
  ssr: true,
});

export const metadata: Metadata = {
  title: "Customized Websites - EXCERPT TECHNOLOGIES PRIVATE LIMITED",
  description: "Explore our customized website solutions tailored to your business needs.",
};

export default function CustomizedwebsitesPage() {
  return (
    <LayoutWrapper>
      <CustomizedWebsites />
    </LayoutWrapper>
  );
}

