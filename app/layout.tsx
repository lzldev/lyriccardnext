import { clsx } from 'clsx'
import './globals.css'
import { GeistSans as Font } from 'geist/font/sans'
import { HydrationOverlay } from '@builder.io/react-hydration-overlay'

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
          'bg-background text-dark selection:bg-accent-highlight',
          Font.className,
        )}
      >
        <HydrationOverlay>
          <main className='flex h-screen min-h-screen w-full flex-col'>
            {children}
          </main>
        </HydrationOverlay>
      </body>
    </html>
  )
}
