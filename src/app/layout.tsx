import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from '@/components/providers/SessionProvider';
import { ConditionalLayout } from '@/components/ConditionalLayout';
import { ToastProvider } from '@/components/ui/Toast';
import { ModalProvider } from '@/components/ui/Modal';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EmailCleaner - AI-Powered Inbox Management",
  description: "Keep your inbox clean and organized with AI-powered email management. Automatically identify and clean up unwanted emails.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <ToastProvider>
            <ModalProvider>
              <ConditionalLayout>
                {children}
              </ConditionalLayout>
            </ModalProvider>
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
