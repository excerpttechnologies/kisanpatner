import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import LayoutWrapper from '@/app/components/LayoutWrapper';

const CrmSystems = dynamic(() => import('@/app/components/Pages/Service/Crm'), {
  loading: () => <div className="flex justify-center items-center h-screen">Loading...</div>,
  ssr: true,
});

export const metadata: Metadata = {
  title: "CRM Systems - EXCERPT TECHNOLOGIES PRIVATE LIMITED",
  description: "Discover our CRM systems to enhance customer relationships and drive business growth.",
};

export default function CrmPage() {
  return (
    <LayoutWrapper>
      <CrmSystems />
    </LayoutWrapper>
  );
}

