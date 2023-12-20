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
      <body className={clsx('bg-neutral-900 text-neutral-50', Font.className)}>
        <main className='flex min-h-screen h-screen w-screen items-center justify-center flex-col overflow-x-hidden'>
          {children}
          <footer className='flex flex-row-reverse w-full py-4 px-4 tracking-tighter'>
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
