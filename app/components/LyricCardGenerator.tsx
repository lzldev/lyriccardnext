'use client'

import { ArtistsQuery } from './ArtistQuery'
import { LyricCard } from './LyricCard'

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
