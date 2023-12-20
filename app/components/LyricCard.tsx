'use client'

import clsx from 'clsx'
import { useCallback, useRef } from 'react'
import html2canvas from 'html2canvas'
import { useArtistQueryStore } from '../stores/ArtistQueryStore'

type LyricCardProps = {
  vertical?: boolean
}

const LyricCard = ({ vertical }: LyricCardProps) => {
  const cardRef = useRef(null)
  const { artist } = useArtistQueryStore((store) => ({
    artist: store.selected,
  }))

  const exportCardCallback = useCallback(async () => {
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

  if (!artist) {
    return <></>
  }

  return (
    <div className='flex flex-col gap-y-2'>
      <div
        ref={cardRef}
        style={{ backgroundImage: `url(${artist.images[0].url})` }}
        className={clsx(
          'bg-accent flex flex-col',
          vertical ? 'h-[30rem] w-[30rem]' : 'h-[20rem] w-[30rem]' //TODO: use correct aspect ratios in this
        )}
      >
        <p
          className='flex flex-col justify-end p-4 text-xl outline-none grow'
          contentEditable
          suppressContentEditableWarning
        >
          Click to edit
          <br />
          Press enter to insert new lines <br />
          Or just paste some text
        </p>
        <div className='self-end w-full p-4 bg-black border-t-2'>
          {`${artist.name}, `}
          <span
            className='outline-none'
            contentEditable
            suppressContentEditableWarning
          >{`"SONG NAME"`}</span>
        </div>
      </div>
      <div
        className='flex p-2 transition-colors cursor-pointer select-none bg-accent hover:bg-accent-highlight active:bg-accent-dark'
        onClick={exportCardCallback}
      >
        export card
      </div>
    </div>
  )
}

export { LyricCard }
