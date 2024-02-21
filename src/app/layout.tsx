import type { Metadata } from "next";
import { Inter } from "next/font/google";
import DataContextProvider from "src/components/DataContextProvider ";
import MainLayout from "src/layouts/layout";

const inter = Inter({ subsets: ["latin"] });

/**
 * Metadata object containing information about the page's title and description that used for Crawler
 * @type {Metadata}
 */

export const metadata: Metadata = {
  title: "Employee management",
  description: "CRUD operations for Employee management",
};

/**
 * The RootLayout component serves as the root structure for the application's HTML layout.
 * It wraps the main content within the MainLayout component and applies the Inter font.
 * @param {Object} props - The properties passed to the RootLayout component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The JSX representation of the RootLayout component.
 */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DataContextProvider>
          <MainLayout>{children}</MainLayout>
        </DataContextProvider>
      </body>
    </html>
  );
}
