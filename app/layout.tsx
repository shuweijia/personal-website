import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "舒惟佳 · 产品经理与 AI 开发",
  description: "舒惟佳的产品与体验设计作品集：从用户研究、产品策略和交互设计，到可运行的产品落地。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
