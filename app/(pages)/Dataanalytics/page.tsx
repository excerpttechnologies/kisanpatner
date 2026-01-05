import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import LayoutWrapper from '@/app/components/LayoutWrapper';

const Dataanalytics = dynamic(() => import('@/app/components/Pages/Service/Dataanalytics'), {
  loading: () => <div className="flex justify-center items-center h-screen">Loading...</div>,
  ssr: true,
});

export const metadata: Metadata = {
  title: "Data Analytics - EXCERPT TECHNOLOGIES PRIVATE LIMITED - Software As A Service Provider | Best Software Solution Provider",
  description: "Excerpt Technologies Private Limited offers expert Data Analytics and Power BI services, transforming your business data into actionable insights for informed decision-making.",
};

export default function DataanalyticsPage() {
  return (
    <LayoutWrapper>
      <Dataanalytics />
    </LayoutWrapper>
  );
}

