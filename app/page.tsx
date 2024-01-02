import { LyricCardGenerator } from './components/LyricCardGenerator'

export default function Home() {
  return (
    <>
      <div className='flex w-full flex-grow flex-col items-center p-20'>
        <LyricCardGenerator />
      </div>
      <footer className='flex w-full justify-end px-4 py-4 tracking-tighter'>
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
