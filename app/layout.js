import { Inter } from "next/font/google";
import "./ui/globals.css";
const inter = Inter({ subsets: ["latin"] });
import UserSessionProvider from "@/providers/UserSessionProvider";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <UserSessionProvider>
            {children}

          </UserSessionProvider>
      </body>
    </html>
  );
}
