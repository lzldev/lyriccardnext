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
    <div className='flex gap-x-6 items-center w-full h-12'>
      <div className='flex-col items-center flex p-2 gap-y-0.5 bg-neutral-700'>
        <span>Footer</span>
        <input
          type='color'
          className='hover:ring-1 ring-white'
          value={footerColor}
          onChange={(evt) => {
            setLyricCardStyle('footerColor', evt.currentTarget.value)
          }}
        />
      </div>
      <div className='gap-x-3 flex'>
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
      <div className='gap-x-3 flex'>
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
