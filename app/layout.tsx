import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { getLocale } from "next-intl/server";
import { ThemeProvider } from "@/common/providers/theme-provider";
import { SITE_CONFIG } from "@/config";
import Script from "next/script";
import { ClerkProvider } from "@clerk/nextjs";
import { UserDocumentProvider } from "@/common/providers/user-document";
import { RecommendationsProvider } from "@/common/providers/recommendations";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TRP - AI Vacation Planner",
  description:
    "Sway is an AI vacation planner that helps you plan your next vacation. It uses AI to generate personalized vacation recommendations based on your preferences.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <ClerkProvider>
      <UserDocumentProvider>
        <RecommendationsProvider>
          <html lang={locale} suppressHydrationWarning>
            <body className={`${montserrat.variable} antialiased`}>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                forcedTheme="light"
                disableTransitionOnChange
              >
                {children}
              </ThemeProvider>
              {SITE_CONFIG.isProd && (
                <Script
                  id="CookieConsent"
                  src="https://policy.app.cookieinformation.com/uc.js"
                  data-culture="EN"
                  data-gcm-version="2.0"
                  type="text/javascript"
                />
              )}
            </body>
          </html>
        </RecommendationsProvider>
      </UserDocumentProvider>
    </ClerkProvider>
  );
}
