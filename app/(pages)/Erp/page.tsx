import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import LayoutWrapper from'@/app/components/LayoutWrapper';

const ErpSystems = dynamic(() => import('@/app/components/Pages/Service/Erp'), {
  loading: () => <div className="flex justify-center items-center h-screen">Loading...</div>,
  ssr: true,
});

export const metadata: Metadata = {
  title: "ERP Systems - EXCERPT TECHNOLOGIES PRIVATE LIMITED",
  description: "Explore our ERP systems designed to streamline your business processes.",
};

export default function ErpPage() {
  return (
    <LayoutWrapper>
      <ErpSystems />
    </LayoutWrapper>
  );
}

