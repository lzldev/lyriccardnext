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

  const artists = result?.artists?.items
  const foundArtists = artists?.length && artists?.length > 0

  return (
    <div className='relative flex flex-col w-full'>
      {loading && (
        <p className='absolute right-4 inset-y-0 align-middle h-full'>
          loading...
        </p>
      )}
      <input
        className='flex w-full max-w-full min-w-0 p-1 outline-none bg-neutral-700 focus:outline-accent-highlight ring-1 ring-accent'
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
          !showDropDown || !foundArtists ? 'hidden' : ''
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
