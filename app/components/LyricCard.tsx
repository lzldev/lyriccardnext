'use client'

import clsx from 'clsx'
import html2canvas from 'html2canvas'

import { type HTMLAttributes, useCallback, useRef } from 'react'
import { useArtistImageStore } from '../stores/ArtistImageStore'
import { useArtistQueryStore } from '../stores/ArtistQueryStore'

type LyricCardProps = {
  vertical?: boolean
}

const LyricCard = ({vertical}:LyricCardProps) => {
  const cardRef = useRef(null)

  const selected = useArtistImageStore((s) => s.selected)
  const artist = useArtistQueryStore((s) => s.selected)

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

  if (!artist || !selected) {
    return <></>
  }

  return (
    <div className='flex flex-col gap-y-2'>
      <div
        ref={cardRef}
        style={{ backgroundImage: `url(${selected.src})` }}
        className={clsx(
          'bg-accent flex flex-col max-w-full max-h-full',
          vertical ? 'h-[30rem] w-[30rem]' : 'h-[20rem] w-[30rem]'
        )}
      >
        <p
          className='flex flex-col justify-end p-4 text-xl outline-none flex-grow'
          contentEditable
          suppressContentEditableWarning
        >
          Click to edit
          <br />
          Press enter to insert new lines <br />
          Or just paste some text
        </p>
        <div className='w-full p-4 bg-transparent border-t-2 relative isolate bg-black'>
          <input
            defaultValue={'#000000'}
            type='color'
            className='outline-none inset-0 w-full h-full -z-10 absolute cursor-pointer'
          />
          <span className='z-10 pointer-events-auto'>
            {`${artist.name}, `}
            <span
              className='outline-none'
              contentEditable
              suppressContentEditableWarning
            >{`"SONG NAME"`}</span>
          </span>
        </div>
      </div>
      <div
        className='group/button flex align-middle items-center p-2 transition-colors cursor-pointer select-none bg-accent hover:bg-accent-highlight active:bg-accent-dark'
        onClick={exportCardCallback}
      >
        <DownloadIcon className='group-hover/button:scale-110 size-5 mx-1' />
        download
      </div>
    </div>
  )
}

const DownloadIcon = (props: HTMLAttributes<SVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='32'
      height='32'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        fill='currentColor'
        d='M13 3a1 1 0 1 0-2 0v12.086l-3.293-3.293a1 1 0 0 0-1.414 1.414l5 5a1 1 0 0 0 1.414 0l5-5a1 1 0 0 0-1.414-1.414L13 15.086zM5 20a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2z'
      />
    </svg>
  )
}
export { LyricCard }
