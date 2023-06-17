import "./globals.css";
import { Inter as Font } from "next/font/google";

const FontClass = Font({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Lyric Card Generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={FontClass.className}>
        <main className="flex min-h-screen h-screen w-screen items-center justify-center flex-col overflow-x-hidden">
          {children}
          <div className="bg-pink-800 flex flex-row-reverse h-[10%] w-full self-end items-center justify-stretch px-24 text-xl">
            made by @lizlodev
          </div>
        </main>
      </body>
    </html>
  );
}
