'use client'

import { useState } from 'react'
import { SearchArtistResponse } from '../api/search/spotifyParser'
import { ArtistsQuery } from './ArtistQuery'
import { LyricCard } from './LyricCard'

export const LyricCardGenerator = () => {
  const [selected, setSelected] = useState<number | null>(null)
  const [artists, setArtists] = useState<SearchArtistResponse | null>(null)

  return (
    <div className='gap-y-2 flex flex-col'>
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
      <div className='flex flex-row gap-2'>
        {selected !== null && (
          <>
            <LyricCard artist={artists!.artists.items[selected]} />
            <LyricCard artist={artists!.artists.items[selected]} vertical />
          </>
        )}
      </div>
    </div>
  )
}
