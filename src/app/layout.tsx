import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { Sidebar } from "@/components/Sidebar";
import { UniverseBackground } from "@/components/UniverseBackground";
import { ChatbotFAB } from "@/components/ChatbotFAB";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Interactive Portfolio",
  description: "Portfolio powered by Vercel AI SDK",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background antialiased overflow-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-screen w-full relative">
            <Sidebar />
            <UniverseBackground />
            <main className="flex-1 h-full overflow-y-auto relative z-10">
              {children}
            </main>
          </div>
          <ChatbotFAB />
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
