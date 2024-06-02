import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import MainProvider from "@/components/MainProvider";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const font = Space_Grotesk({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "SC | Admin Panel",
  description: "Skins Capital | Admin Panel",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <MainProvider>
          <div className="flex h-full">
            <Sidebar />
            <div className="flex flex-col w-full">
              <Navbar />
              <div className="flex flex-col px-4 py-10 overflow-y-scroll">
                {children}
              </div>
            </div>
          </div>
        </MainProvider>
      </body>
    </html>
  );
}
