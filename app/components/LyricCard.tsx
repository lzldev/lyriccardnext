'use client'

import clsx from 'clsx'

import { type HTMLAttributes, useCallback, useRef, useMemo, useId } from 'react'
import { useArtistImageStore } from '../stores/ArtistImageStore'
import { useArtistQueryStore } from '../stores/ArtistQueryStore'
import { useLyricCardStore } from '../stores/LyricCardStore'
import { createPortal } from 'react-dom'
import { isDark, rgbToHsl } from '../utils/colors'
import { DraggableImage } from './DraggableImage'
import { toPng } from 'html-to-image'

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
    lyricsAlign,
  } = useLyricCardStore((s) => ({
    content: s.content,
    setContent: s.setContent,
    footerContent: s.footerContent,
    setFooterContent: s.setFooterContent,
    footerColor: s.footerColor,
    fontSize: s.fontSize,
    cardMode: s.cardMode,
    lyricsAlign: s.lyricsAlign,
  }))

  const isFooterDark = useMemo(() => isDark(footerColor), [footerColor])
  const imageURI = useMemo(
    () => selected?.src.replace('avatar170s', '700x0'),
    [selected],
  )

  const exportCardCallback = useCallback(async () => {
    if (!cardRef.current) return

    const newimg = await toPng(cardRef.current, {})

    const link = document.createElement('a')
    link.href = newimg
    link.download = 'lyric_card.png'
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
          'relative flex h-[22rem] w-full flex-col overflow-hidden bg-accent object-contain',
          vertical ? 'aspect-[5/4]' : 'aspect-[16/9]',
        )}
      >
        <DraggableImage src={imageURI} className='absolute max-w-none' />
        <div
          className={clsx('pointer-events-none z-20 flex flex-grow flex-col')}
        >
          <p
            className={clsx(
              'pointer-events-auto flex h-fit w-fit bg-clip-content p-4 outline-none',
              cardMode === 'dark' && 'bg-black text-white',
              cardMode === 'light' && 'bg-white text-black',
              fontSize === 'sm' && 'text-md',
              fontSize === 'md' && 'text-xl',
              fontSize === 'lg' && 'text-2xl',
              lyricsAlign === 'bl' && 'mt-auto',
              lyricsAlign === 'br' && 'mt-auto self-end',
              lyricsAlign === 'tr' && 'self-end',
              lyricsAlign === 'tl' && '',
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
          className={clsx(
            'z-20 w-full border-t-2 bg-transparent p-4',
            isFooterDark && 'border-white text-white',
            !isFooterDark && 'border-black text-black',
          )}
          style={{
            backgroundColor: footerColor,
          }}
        >
          <span className='pointer-events-auto'>
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
      {document.getElementById('bt-downloads') &&
        createPortal(
          <div
            className='group/button flex cursor-pointer select-none items-center bg-accent p-2 align-middle transition-colors hover:bg-accent-highlight active:bg-accent-dark'
            onClick={exportCardCallback}
          >
            <DownloadIcon className='mx-1 size-5 group-hover/button:scale-110' />
            download
          </div>,
          document.getElementById('bt-downloads')!,
        )}
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
