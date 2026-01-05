import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import LayoutWrapper from '@/app/components/LayoutWrapper';

const Contact = dynamic(() => import('@/app/components/Contact/Contact'), {
  loading: () => <div className="flex justify-center items-center h-screen">Loading...</div>,
  ssr: true,
});

export const metadata: Metadata = {
  title: "Contact Us - EXCERPT TECHNOLOGIES PRIVATE LIMITED - Software As A Service Provider | Best Software Solution Provider",
  description: "Get in touch with Excerpt Technologies Private Limited. Contact us for software solutions, web development, e-commerce, and IT services.",
};

export default function ContactPage() {
  return (
    <LayoutWrapper>
      <Contact />
    </LayoutWrapper>
  );
}

