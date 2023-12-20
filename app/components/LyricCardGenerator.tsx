'use client'

import dynamic from 'next/dynamic'
import { ArtistsQuery } from './ArtistQuery'

const LyricCard = dynamic(async () => (await import('./LyricCard')).LyricCard, {
  ssr: false,
  loading: () => (
    <div className='flex items-center justify-center text-xl flex-grow h-72'>
      Loading...
    </div>
  ),
})

export const LyricCardGenerator = () => {
  return (
    <>
      <ArtistsQuery />
      <div className='p-2' />
      <div className='flex flex-row flex-wrap justify-center w-full gap-4'>
        <LyricCard />
        <LyricCard vertical />
      </div>
    </>
  )
}
