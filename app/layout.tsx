import { clsx } from 'clsx'
import './globals.css'
import { GeistSans as Font } from 'geist/font/sans'

// const FontClass = Font({ weight: '400', subsets: ['latin'] })

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
          Font.className
        )}
      >
        <main className='flex flex-col w-full h-screen min-h-screen'>
          {children}
          <footer className='flex flex-row-reverse w-full px-4 py-4 tracking-tighter'>
            <span className='select-none'>
              source @
              <a
                className='font-semibold hover:underline'
                href='https://github.com/lzldev/'
              >
                lzldev
              </a>
            </span>
          </footer>
        </main>
      </body>
    </html>
  )
}
