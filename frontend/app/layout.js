import { Geist, Geist_Mono, Raleway } from "next/font/google";
import "./globals.css";
import DashboardLayout from "./components/layout/DashboardLayout";
import AuthHydrator from "./components/auth/AuthHydrator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // choose what you need
});

export const metadata = {
  title: "Kernel — Dynamic Permissions Engine",
  description: "Enterprise-grade RBAC and Secure Device Authentication Systemp",
  authors: [{ name: "Bachan Singh" }],
  icons: {
    icon: "/favicon.ico", // You can add a custom 'K' logo icon here later
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}  ${raleway.variable} antialiased`}
      >
         <AuthHydrator /> {/* ✅ THIS WAS MISSING */}
        <DashboardLayout>
          {children}
        </DashboardLayout>
      </body>
    </html>
  );
}
