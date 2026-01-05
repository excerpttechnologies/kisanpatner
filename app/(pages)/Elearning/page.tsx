import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import LayoutWrapper from '@/app/components/LayoutWrapper';

const Elearning = dynamic(() => import('@/app/components/Pages/Service/Elearning'), {
  loading: () => <div className="flex justify-center items-center h-screen">Loading...</div>,
  ssr: true,
});

export const metadata: Metadata = {
  title: "E-Learning Solutions - EXCERPT TECHNOLOGIES PRIVATE LIMITED",
  description: "Explore our E-Learning solutions to enhance your educational offerings.",
};

export default function ElearningPage() {
  return (
    <LayoutWrapper>
      <Elearning />
    </LayoutWrapper>
  );
}

