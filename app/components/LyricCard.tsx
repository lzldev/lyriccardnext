'use client'

import clsx from 'clsx'
import html2canvas from 'html2canvas'

import { type HTMLAttributes, useCallback, useRef } from 'react'
import { useArtistImageStore } from '../stores/ArtistImageStore'
import { useArtistQueryStore } from '../stores/ArtistQueryStore'
import { useLyricCardStore } from '../stores/LyricCardStore'

type LyricCardProps = {
  vertical?: boolean
}

const LyricCard = ({ vertical }: LyricCardProps) => {
  const cardRef = useRef(null)

  const selected = useArtistImageStore((s) => s.selected)
  const artist = useArtistQueryStore((s) => s.selected)

  const {
    content,
    setFooterContent,
    footerContent,
    setContent,
    footerColor,
    cardMode,
    fontSize,
  } = useLyricCardStore((s) => ({
    content: s.content,
    setContent: s.setContent,
    footerContent: s.footerContent,
    setFooterContent: s.setFooterContent,
    footerColor: s.footerColor,
    fontSize: s.fontSize,
    cardMode: s.cardMode,
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

  if (!artist || !selected) {
    return <></>
  }

  return (
    <div className={clsx('flex flex-col gap-y-2')}>
      <div
        ref={cardRef}
        className={clsx(
          'bg-accent w-full h-[18rem] flex flex-col relative object-contain overflow-hidden',
          // vertical ? 'h-[30rem] w-[30rem]' : 'h-[20rem] w-[30rem]'
          vertical ? 'aspect-[5/4]' : 'aspect-[16/9]'
        )}
        style={{ backgroundImage: `url(${selected.src})` }}
      >
        <div className='flex flex-grow flex-col-reverse'>
          <p
            className={clsx(
              'flex w-fit p-4 outline-none bg-clip-content',
              cardMode === 'dark' && 'bg-black text-white',
              cardMode === 'light' && 'bg-white text-black',
              fontSize === 'sm' && 'text-md',
              fontSize === 'md' && 'text-xl',
              fontSize === 'lg' && 'text-2xl'
            )}
            contentEditable
            spellCheck={false}
            suppressContentEditableWarning
            onBlur={setContent}
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </div>
        <div
          className='relative p-4 w-full bg-transparent bg-black border-t-2 isolate'
          style={{
            backgroundColor: footerColor,
          }}
        >
          <span className='z-10 pointer-events-auto'>
            {`${artist.name}, `}
            <span
              className='outline-none'
              spellCheck={false}
              contentEditable
              suppressContentEditableWarning
              onBlur={setFooterContent}
              dangerouslySetInnerHTML={{
                __html: footerContent,
              }}
            />
          </span>
        </div>
      </div>
      <div
        className='flex items-center p-2 align-middle transition-colors cursor-pointer select-none group/button bg-accent hover:bg-accent-highlight active:bg-accent-dark'
        onClick={exportCardCallback}
      >
        <DownloadIcon className='mx-1 size-5 group-hover/button:scale-110' />
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
