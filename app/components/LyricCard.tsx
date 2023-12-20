'use client'

import clsx from 'clsx'
import { SpotifyArtist } from '../api/search/spotifyParser'
import { useCallback, useRef } from 'react'
import html2canvas from 'html2canvas'

type ComponentProp = {
  artist: SpotifyArtist
  vertical?: boolean
}

const LyricCard = ({ artist, vertical }: ComponentProp) => {
  const cardRef = useRef(null)

  const callback = useCallback(async () => {
    if (!cardRef.current) return

    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: null,
      scale: 2,
      useCORS: true,
    })

    const screenshot = canvas.toDataURL('image/png')
    const link = document.createElement('a')

    link.href = screenshot
    link.download = 'screenshot.png'
    link.click()
  }, [cardRef])

  return (
    <div className='flex flex-col'>
      <div
        ref={cardRef}
        style={{ backgroundImage: `url(${artist.images[0].url})` }}
        className={clsx(
          'bg-pink-500 flex flex-col',
          vertical ? 'h-[30rem] w-[30rem]' : 'h-[20rem] w-[30rem]' //TODO: use correct aspect ratios in this
        )}
      >
        <div
          className='grow justify-end flex text-xl flex-col p-4'
          contentEditable
          suppressContentEditableWarning
        >
          {`
          Click to edit
          Press enter to insert new lines

          Or just paste some text
          `}
        </div>
        <div className='p-4 self-end bg-black w-full border-t-2'>
          {`${artist.name}, `}
          <span
            contentEditable
            suppressContentEditableWarning
          >{`"SONG NAME"`}</span>
        </div>
      </div>
      <div
        className='bg-rose-600 p-2 flex hover:bg-rose-400'
        onClick={callback}
      >
        export
        <span className='ml-2'>{vertical ? 'vertical' : 'laying down'}</span>
      </div>
    </div>
  )
}

export { LyricCard }
