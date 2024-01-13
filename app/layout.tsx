import { clsx } from 'clsx'
import './globals.css'
import { GeistSans as Font } from 'geist/font/sans'

export const metadata = {
  title: 'Lyric Card Generator',
  description: 'Generate lyric cards from Spotify images.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={clsx(
          'selection:bg-accent-highlight flex min-h-full w-full max-w-full flex-col bg-background text-dark antialiased selection:bg-accent',
          Font.className,
        )}
      >
        <main className='flex min-h-screen w-full flex-col'>{children}</main>
      </body>
    </html>
  )
}
