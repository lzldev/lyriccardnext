'use client'

import { useState } from 'react'
import { SearchArtistResponse } from '../api/search/spotifyParser'
import { ArtistsQuery } from './ArtistQuery'
import { LyricCard } from './LyricCard'

export const LyricCardGenerator = () => {
  const [selected, setSelected] = useState<number | null>(null)
  const [artists, setArtists] = useState<SearchArtistResponse | null>(null)

  return (
    <>
      <ArtistsQuery
        artists={artists?.artists?.items || []}
        onSelect={(idx) => {
          setSelected(() => idx)
        }}
        onQuery={async (query) => {
          const artists = (await (
            await fetch(`/api/search?q=${query}`)
          ).json()) as SearchArtistResponse

          setArtists(artists)
        }}
      />
      <div className='p-2' />
      <div className='flex flex-row flex-wrap justify-center w-full gap-4'>
        {selected !== null && (
          <>
            <LyricCard artist={artists!.artists.items[selected]} />
            <LyricCard artist={artists!.artists.items[selected]} vertical />
          </>
        )}
      </div>
    </>
  )
}
