'use client'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { SpotifyArtist } from '../api/search/spotifyParser'
import { effect, useSignal } from '@preact/signals-react'
import { clsx } from 'clsx'

type ComponentProps = {
  onQuery: (query: string) => any
  onSelect: (idx: number) => any
  artists: SpotifyArtist[]
} & PropsWithChildren

const DEBOUNCETIME = 500

const ArtistsQuery = ({
  artists,
  onSelect,
  onQuery,
  children,
}: ComponentProps) => {
  const showDropDown = useSignal(false)
  const query = useSignal('')
  const debounce = useRef<NodeJS.Timeout | undefined>(undefined)
  const lastQuery = useRef<string>('')

  useEffect(() => {
    if (debounce.current) {
      clearTimeout(debounce.current)
    }
    if (query.value === lastQuery.current) {
      return
    }
    const listener = () => {
      onQuery(query.value)
      lastQuery.current = query.value
    }

    debounce.current = setTimeout(listener, DEBOUNCETIME)

    return () => {
      clearTimeout(debounce.current)
    }
  }, [query.value, onQuery])

  return (
    <div className='relative'>
      <input
        type='text'
        value={query.value}
        onChange={(evt) => {
          query.value = evt.currentTarget.value
        }}
        onFocus={(evt) => {
          showDropDown.value = true
        }}
        // onBlur={() => {
        //   showDropDown.value = false
        // }}
        className='bg-neutral-700 outline-none ring-1 ring-pink-800 p-0.5 w-full'
        placeholder='Search Artist'
      />
      <div
        className={clsx(
          'absolute -bottom-[5rem] z-10 h-[5rem] bg-neutral-600 w-full overflow-y-scroll',
          !showDropDown.value || artists.length === 0 ? 'hidden' : ''
        )}
      >
        {artists.map((item, idx) => (
          <p
            key={idx}
            className='hover:bg-neutral-500 select-none'
            onClick={(evt) => {
              onSelect(idx)
              showDropDown.value = false
            }}
          >
            {item.name}
          </p>
        ))}
      </div>
    </div>
  )
}

export { ArtistsQuery }
