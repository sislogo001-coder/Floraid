import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FloraID - Identifica y cuida tus plantas",
  description: "La mejor app para identificar plantas, flores y frutos. Aprende sobre nomes científicos y comunes de tu región.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
