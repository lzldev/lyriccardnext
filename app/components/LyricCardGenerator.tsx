'use client'

import { ArtistsQuery } from './ArtistQuery'
import { ImagePicker } from './ImagePicker'
import { LyricCard } from './LyricCard'
import { LyricCardOptions } from './LyricCardOptions'
export const LyricCardGenerator = () => {
  return (
    <div className='flex w-full flex-col gap-y-4 md:max-w-6xl'>
      <ArtistsQuery />
      <ImagePicker />
      <div className='flex w-full flex-row flex-wrap justify-center gap-4'>
        <LyricCard vertical />
        <LyricCard />
        <LyricCardOptions />
      </div>
    </div>
  )
}
