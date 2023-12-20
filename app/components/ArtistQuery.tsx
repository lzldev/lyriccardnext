'use client'

import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { SpotifyArtist } from '../api/search/spotifyParser'
import { clsx } from 'clsx'

type ComponentProps = {
  onQuery: (query: string) => any
  onSelect: (idx: number) => any
  artists: SpotifyArtist[]
} & PropsWithChildren

const DEBOUNCETIME = 500

const ArtistsQuery = ({ artists, onSelect, onQuery }: ComponentProps) => {
  const [showDropDown, setShowDropDown] = useState(false)
  const debounce = useRef<NodeJS.Timeout | undefined>(undefined)
  const lastQuery = useRef<string>('')

  const [query, setStateQuery] = useState('')

  useEffect(() => {
    if (debounce.current) {
      clearTimeout(debounce.current)
    }

    if (query === lastQuery.current) {
      return
    }

    const listener = () => {
      onQuery(query)
      lastQuery.current = query
    }

    debounce.current = setTimeout(listener, DEBOUNCETIME)

    return () => {
      clearTimeout(debounce.current)
    }
  }, [query, onQuery])

  return (
    <div className='relative'>
      <input
        type='text'
        value={query}
        onChange={(evt) => {
          setStateQuery(evt.currentTarget.value)
        }}
        onFocus={() => {
          setShowDropDown(true)
        }}
        // onBlur={() => {
        //   setShowDropDown(false)
        // }}
        className='bg-neutral-700 outline-none focus:outline-pink-700 ring-1 ring-pink-800 p-0.5 w-full'
        placeholder='Search Artist'
      />
      <div
        className={clsx(
          'absolute -bottom-[5rem] z-10 h-[5rem] bg-neutral-600 w-full overflow-y-scroll pointer-events-none',
          !showDropDown || artists.length === 0 ? 'hidden' : ''
        )}
      >
        {artists.map((item, idx) => (
          <div
            key={idx}
            onClick={(evt) => {
              evt.preventDefault()
              evt.stopPropagation()

              console.log('id ->', idx)

              onSelect(idx)
              setShowDropDown(false)
            }}
            className='flex hover:bg-neutral-500 select-none pointer-events-auto'
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export { ArtistsQuery }
