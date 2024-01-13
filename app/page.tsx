import { LyricCardGenerator } from './components/LyricCardGenerator'

export default function Home() {
  return (
    <>
      <LyricCardGenerator />
      <footer className='flex w-full justify-end px-4 py-4 tracking-tighter'>
        <span className='select-none'>
          source
          <a
            className='font-semibold text-dark-highlight'
            href='https://github.com/lzldev/'
          >
            {' @lzldev'}
          </a>
        </span>
      </footer>
    </>
  )
}
