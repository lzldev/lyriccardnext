'use client'

import { ArtistsQuery } from './ArtistQuery'
import { ImagePicker } from './ImagePicker'
import { LyricCard } from './LyricCard'
import { LyricCardOptions } from './LyricCardOptions'
export const LyricCardGenerator = () => {
  return (
    <div className='flex h-full min-h-full w-full flex-grow flex-col items-center justify-stretch shadow-woodsmoke-500'>
      <div className='flex h-full w-full flex-1 flex-col gap-y-4 p-4 md:max-w-6xl md:pt-6'>
        <ArtistsQuery />
        <ImagePicker />
        <div className='flex w-full flex-row-reverse flex-wrap gap-4 md:flex-row'>
          <LyricCard vertical />
          <LyricCard />
        </div>
        <div className='flex-grow' />
        <LyricCardOptions />
      </div>
    </div>
  )
}
