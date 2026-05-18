import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { getToken } from "@/lib/auth-server";

export const metadata: Metadata = {
  title: "MSI Test — AI-Powered E2E Test Platform",
  description: "QA teams describe what to test in plain language, the AI generates and runs Playwright tests, and results are presented with per-step screenshots and intelligent failure analysis.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getToken().catch(() => null);

  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full font-sans">
        <ConvexClientProvider initialToken={token}>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
