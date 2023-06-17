'use client'

import { useSignal } from '@preact/signals-react'
import { useState } from 'react'
import { SearchArtistResponse } from './api/search/spotifyParser'
import { ArtistsQuery } from './components/ArtistQuery'
import { LyricCard } from './components/LyricCard'

export default function Home() {
  const sc = useSignal(0)
  const selected = useSignal<number | null>(null)
  const [artists, setArtists] = useState<SearchArtistResponse | null>(null)

  return (
    <div className='flex p-24 flex-col grow w-full jusitfy-center items-center'>
      <ArtistsQuery
        artists={artists?.artists?.items || []}
        onSelect={(idx) => {
          selected.value = idx
        }}
        onQuery={async (query) => {
          const artists = (await (
            await fetch(`/api/search?q=${query}`)
          ).json()) as SearchArtistResponse

          setArtists(artists)
        }}
      />
      <div className='flex flex-row gap-2 m-2'>
        {selected.value !== null && (
          <LyricCard artist={artists!.artists.items[selected.value]} />
        )}
        {selected.value !== null && (
          <LyricCard artist={artists!.artists.items[selected.value]} square />
        )}
      </div>
    </div>
  )
}
