import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "کوهیار",
  description: "پلتفرم پروفایل و رویدادهای گروهی",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-app-bg text-ink">
        {children}
      </body>
    </html>
  );
}
