import { LyricCardGenerator } from './components/LyricCardGenerator'

export default function Home() {
  return (
    <>
      <div className='flex flex-col flex-grow items-center p-20 mx-auto w-full md:max-w-6xl'>
        <LyricCardGenerator />
      </div>
      <footer className='flex flex-row-reverse py-4 px-4 w-full tracking-tighter'>
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
    </>
  )
}
