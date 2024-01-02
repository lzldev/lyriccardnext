import { useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'
import { useArtistQueryStore } from '../stores/ArtistQueryStore'

const ArtistsQuery = () => {
  const [showDropDown, setShowDropDown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { query, setArtistQuery, result, pickArtist, loading } =
    useArtistQueryStore((store) => ({
      query: store.query,
      loading: store.loading,
      setArtistQuery: store.setArtistQuery,
      result: store.result,
      pickArtist: store.pickArtist,
    }))

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (dropdownRef.current!.contains(e.target as any)) {
        return
      }
      setShowDropDown(false)
    }
    document.addEventListener('mousedown', listener, false)
    return () => document.removeEventListener('mousedown', listener, false)
  }, [])

  const artists = result?.results.artistmatches.artist
  const foundArtists = artists?.length && artists?.length > 0
  const showDrop = loading || !showDropDown || !foundArtists
  return (
    <div className='relative flex w-full flex-col'>
      {loading && (
        <p className='absolute inset-y-0 right-4 h-full align-middle'>
          loading...
        </p>
      )}
      <input
        className={clsx(
          'flex w-full min-w-0 max-w-full border-accent bg-background-highlight p-1 outline-none placeholder:text-dark',
          showDrop && 'border-b',
        )}
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
        ref={dropdownRef}
        className={clsx(
          'pointer-events-none absolute -bottom-[5rem] z-10 h-[5rem] w-full overflow-y-scroll border-b border-accent bg-dark-background-dimmed',
          showDrop ? 'invisible' : '',
        )}
      >
        {artists?.map((item, idx) => (
          <div
            key={idx}
            tabIndex={idx}
            className='pointer-events-auto flex select-none hover:bg-dark-highlight'
            onClick={(evt) => {
              evt.preventDefault()
              evt.stopPropagation()

              pickArtist(idx)
              setShowDropDown(false)
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export { ArtistsQuery }
