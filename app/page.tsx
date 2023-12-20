import { LyricCardGenerator } from './components/LyricCardGenerator'

export default function Home() {
  return (
    <div className='flex flex-col items-center flex-grow w-full p-20 mx-auto md:max-w-6xl'>
      <LyricCardGenerator />
    </div>
  )
}
