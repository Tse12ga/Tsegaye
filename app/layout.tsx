import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import FiberBackground from "@/components/FiberBackground";
import CustomCursor from "@/components/CustomCursor";
import SoundToggle from "@/components/SoundToggle";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Tsegaye Shumet | IT Operations & Web Engineering",
  description: "Enterprise IT Operations Manager and Web Developer specializing in Next.js, Prisma, NVR/DVR systems, and physical network topologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#030303] text-[#D7E2EA] selection:bg-white selection:text-black md:cursor-none`}>
        <SoundToggle />
        <CustomCursor />
        <FiberBackground />
        <SmoothScroll>
          <div className="relative z-10">
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
