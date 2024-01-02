'use client'

import dynamic from 'next/dynamic'

const ArtistsQuery = dynamic(
  async () => (await import('./ArtistQuery')).ArtistsQuery,
  {
    ssr: false,
    loading: () => (
      <div className='flex h-1 items-center justify-center text-xl'>
        Loading...
      </div>
    ),
  },
)

const ImagePicker = dynamic(
  async () => (await import('./ImagePicker')).ImagePicker,
  {
    ssr: false,
    loading: () => (
      <div className='flex h-1 items-center justify-center text-xl'>
        Loading...
      </div>
    ),
  },
)

const LyricCard = dynamic(async () => (await import('./LyricCard')).LyricCard, {
  ssr: false,
  loading: () => (
    <div className='flex h-72 flex-grow items-center justify-center text-xl'>
      Loading...
    </div>
  ),
})

const LyricCardOptions = dynamic(
  async () => (await import('./LyricCardOptions')).LyricCardOptions,
  {
    ssr: false,
    loading: () => (
      <div className='flex h-72 flex-grow items-center justify-center text-xl'>
        Loading...
      </div>
    ),
  },
)

export const LyricCardGenerator = () => {
  return (
    <div className='flex w-full flex-col gap-y-2 md:max-w-6xl'>
      <ArtistsQuery />
      <ImagePicker />
      <div className='flex w-full flex-row flex-wrap justify-center gap-4'>
        <LyricCard />
        <LyricCard vertical />
        <LyricCardOptions />
      </div>
    </div>
  )
}
