import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Свадьба Сергея и Жанеты",
  description: "Приглашение на свадьбу + форма подтверждения",
  icons: {
    icon: [
      { url: "/icons/favicon.ico" },
      { url: "/icons/icons/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icons/icon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/icons/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        {children}
      </body>
    </html>
  );
}
