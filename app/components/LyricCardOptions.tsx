'use client'

import { useArtistImageStore } from '../stores/ArtistImageStore'
import { useLyricCardStore } from '../stores/LyricCardStore'

const LyricCardOptions = () => {
  const selected = useArtistImageStore((s) => s.selected)
  const { setFooterColor, footerColor, setFontSize, setColorMode } =
    useLyricCardStore((s) => ({
      setFooterColor: s.setFooterColor,
      footerColor: s.footerColor,
      setColorMode: s.setCardMode,
      setFontSize: s.setFontSize,
    }))

  if (!selected) {
    return <></>
  }

  return (
    <div className='flex gap-x-2 items-center w-full h-12'>
      <span>Footer Color:</span>
      <input
        type='color'
        value={footerColor}
        onChange={(evt) => {
          setFooterColor(evt.currentTarget.value)
        }}
      />
      <div className='ring-1 ring-accent hover:bg-accent hover:text-dark p-2'>
        dark
      </div>
    </div>
  )
}

export { LyricCardOptions }
