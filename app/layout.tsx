import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-kanit",
});

export const metadata: Metadata = {
  title: "Tsegaye Shumet | Portfolio",
  description: "Web Developer & IT Infrastructure Engineer based in Addis Ababa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-[#0C0C0C]">
      <body className={`${kanit.variable} font-kanit antialiased bg-[#0C0C0C] m-0 p-0`}>
        {children}
      </body>
    </html>
  );
}
