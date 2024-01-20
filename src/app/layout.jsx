import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Utilities/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Warkop Cashier",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex bg-neutral-900 max-w-screen max-h-screen">
          <div className="border-r border-neutral-600/50">
            <Navbar />
          </div>
          <div className="h-screen w-full overflow-hidden text-neutral-300 font-sans">{children}</div>
        </div>
      </body>
    </html>
  );
}
