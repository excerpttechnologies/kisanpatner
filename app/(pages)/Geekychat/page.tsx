import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import LayoutWrapper from '@/app/components/LayoutWrapper';

const GeekyChat = dynamic(() => import('@/app/components/Pages/Service/Geekychat'), {
  loading: () => <div className="flex justify-center items-center h-screen">Loading...</div>,
  ssr: true,
});

export const metadata: Metadata = {
  title: "GeekyChat - EXCERPT TECHNOLOGIES PRIVATE LIMITED",
  description: "Send WhatsApp bulk messages easily with GeekyChat by Excerpt Technologies. Our WhatsApp marketing tool helps businesses engage customers instantly, manage campaigns, and improve reach efficiently.",
  keywords: "whatsapp bulk messaging, whatsapp marketing tool, whatsapp automation software, geekychat app, bulk whatsapp sender, whatsapp campaign tool",
};

export default function GeekyChatPage() {
  return (
    <LayoutWrapper>
      <GeekyChat />
    </LayoutWrapper>
  );
}

