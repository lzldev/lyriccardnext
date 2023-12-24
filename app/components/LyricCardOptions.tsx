'use client'

import { useArtistImageStore } from '../stores/ArtistImageStore'
import { useLyricCardStore } from '../stores/LyricCardStore'

const LyricCardOptions = () => {
  const selected = useArtistImageStore((s) => s.selected)
  const { setFooterColor, footerColor } = useLyricCardStore((s) => ({
    setFooterColor: s.setFooterColor,
    footerColor: s.footerColor,
  }))

  if (!selected) {
    return <></>
  }

  return (
    <div className='flex h-12 w-full items-center gap-x-2'>
      <span>Footer Color:</span>
      <input
        type='color'
        value={footerColor}
        onChange={(evt) => {
          setFooterColor(evt.currentTarget.value)
        }}
      />
    </div>
  )
}

export { LyricCardOptions }
