import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import LayoutWrapper from '@/app/components/LayoutWrapper';

const LmsSystems = dynamic(() => import('@/app/components/Pages/Service/Lms'), {
  loading: () => <div className="flex justify-center items-center h-screen">Loading...</div>,
  ssr: true,
});

export const metadata: Metadata = {
  title: "LMS Solutions - EXCERPT TECHNOLOGIES PRIVATE LIMITED",
  description: "Explore our LMS solutions to enhance your training and educational programs.",
};

export default function LmsPage() {
  return (
    <LayoutWrapper>
      <LmsSystems />
    </LayoutWrapper>
  );
}

