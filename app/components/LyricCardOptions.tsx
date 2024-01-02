'use client'

import { useArtistImageStore } from '../stores/ArtistImageStore'
import { useLyricCardStore } from '../stores/LyricCardStore'
import { twc } from 'react-twc'

const OptionButton = twc.div`bg-accent hover:bg-dark hover:text-accent transition-all duration-75 py-2 px-3 hover:cursor-pointer min-w-10 text-center`

const LyricCardOptions = () => {
  const selected = useArtistImageStore((s) => s.selected)
  const { footerColor, setLyricCardStyle } = useLyricCardStore((s) => ({
    footerColor: s.footerColor,
    setLyricCardStyle: s.setLyricCardStyle,
  }))

  if (!selected) {
    return <></>
  }

  return (
    <div className='flex h-12 w-full items-center gap-x-6'>
      <div className='flex items-center gap-y-0.5 bg-neutral-700 p-2'>
        <span>Footer</span>
        <input
          type='color'
          className='ring-white hover:ring-1'
          value={footerColor}
          onChange={(evt) => {
            setLyricCardStyle('footerColor', evt.currentTarget.value)
          }}
        />
      </div>
      <div className='flex gap-x-3'>
        <span className='flex items-center justify-center text-center'>S</span>
        <OptionButton
          onClick={() => {
            setLyricCardStyle('cardMode', 'light')
          }}
        >
          light
        </OptionButton>
        <OptionButton
          onClick={() => {
            setLyricCardStyle('cardMode', 'dark')
          }}
        >
          dark
        </OptionButton>
      </div>
      <div className='flex gap-x-3'>
        <span className='flex items-center justify-center text-center'>F</span>
        <OptionButton
          onClick={() => {
            setLyricCardStyle('fontSize', 'sm')
          }}
        >
          sm
        </OptionButton>
        <OptionButton
          onClick={() => {
            setLyricCardStyle('fontSize', 'md')
          }}
        >
          md
        </OptionButton>
        <OptionButton
          onClick={() => {
            setLyricCardStyle('fontSize', 'lg')
          }}
        >
          lg
        </OptionButton>
      </div>
    </div>
  )
}

export { LyricCardOptions }
