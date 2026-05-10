import type { Metadata } from "next";
import "./globals.css";
import { SplitProvider } from "@/app/context/SplitContext";

export const metadata: Metadata = {
  title: "Receipt Split Avi – Split bills fairly",
  description: "Split restaurant bills fairly with your friends",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SplitProvider>
          {children}
        </SplitProvider>
      </body>
    </html>
  );
}
