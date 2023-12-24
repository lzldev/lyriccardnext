'use client'

import { useState } from 'react'
import { clsx } from 'clsx'
import { useArtistQueryStore } from '../stores/ArtistQueryStore'

const ArtistsQuery = () => {
  const [showDropDown, setShowDropDown] = useState(false)

  const { query, setArtistQuery, result, pickArtist, loading } =
    useArtistQueryStore((store) => ({
      query: store.query,
      loading: store.loading,
      setArtistQuery: store.setArtistQuery,
      result: store.result,
      pickArtist: store.pickArtist,
    }))

  const artists = result?.results.artistmatches.artist
  const foundArtists = artists?.length && artists?.length > 0

  return (
    <div className='flex relative flex-col w-full'>
      {loading && (
        <p className='absolute inset-y-0 right-4 h-full align-middle'>
          loading...
        </p>
      )}
      <input
        className='flex p-1 w-full min-w-0 max-w-full ring-1 outline-none bg-neutral-700 ring-accent focus:outline-accent-highlight'
        placeholder='Search Artist'
        type='text'
        value={query}
        onChange={(evt) => {
          setArtistQuery(evt.currentTarget.value)
        }}
        onFocus={() => {
          setShowDropDown(true)
        }}
      />
      <div
        className={clsx(
          'absolute -bottom-[5rem] z-10 h-[5rem] bg-neutral-600 w-full overflow-y-scroll pointer-events-none',
          !showDropDown || !foundArtists ? 'hidden' : '',
        )}
      >
        {artists?.map((item, idx) => (
          <div
            key={idx}
            onClick={(evt) => {
              evt.preventDefault()
              evt.stopPropagation()

              pickArtist(idx)
              setShowDropDown(false)
            }}
            className='flex pointer-events-auto select-none hover:bg-neutral-500'
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export { ArtistsQuery }
