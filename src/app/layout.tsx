import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import MainMenu from "./_components/main-menu";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Selfcloud",
  description: "A self-hosted cloud storage solution.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`dark  ${inter.className}`}>
        <TRPCReactProvider>
          <div className="h-full">{children}</div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
