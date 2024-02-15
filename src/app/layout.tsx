import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MainLayout from "src/layouts/layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Employee management",
  description: "CRUD operations for Employee management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
