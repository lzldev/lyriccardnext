'use client'

import clsx from 'clsx'

import { type HTMLAttributes, useCallback, useRef, useMemo } from 'react'
import { useArtistImageStore } from '../stores/ArtistImageStore'
import { useArtistQueryStore } from '../stores/ArtistQueryStore'
import { useLyricCardStore } from '../stores/LyricCardStore'
import { isDark } from '../utils/colors'
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

    const newimg = await toPng(cardRef.current)

    const link = document.createElement('a')
    link.href = newimg
    link.download = 'lyric_card.png'
    link.click()
  }, [cardRef])

  if (!artist || !selected || !imageURI) {
    return <></>
  }

  return (
    <div
      className={clsx(
        'shadow-pink relative flex h-full w-full min-w-[300px] flex-1 flex-col gap-y-2 ring-2 ring-neutral-800 ring-offset-1 ring-offset-dark-background',
        vertical && 'flex-grow',
        !vertical && 'flex-shrink',
      )}
    >
      <div
        onClick={exportCardCallback}
        className={clsx(
          'group/button absolute bottom-6 right-4 z-50 flex cursor-pointer flex-row-reverse overflow-clip text-dark-highlight',
        )}
      >
        <DownloadIcon
          className={clsx(
            'mx-1 flex size-5 rounded-l-full',
            isFooterDark && 'text-card-dark',
            !isFooterDark && 'text-card-light',
          )}
        />
        <div className='-mr-[1.15rem] ml-2 flex w-4 rounded-l-full'></div>
        <div className={'-z-10 flex flex-grow overflow-clip rounded-r-full'}>
          <span
            className={clsx(
              'translate-x-full transition-transform group-hover/button:translate-x-0',
              isFooterDark && 'text-card-dark',
              !isFooterDark && 'text-card-light',
            )}
          >
            download
          </span>
        </div>
      </div>
      <div
        ref={cardRef}
        className={clsx(
          'relative flex h-auto w-full flex-col overflow-clip bg-accent md:max-w-xl',
          vertical ? 'aspect-[5/4]' : 'aspect-[16/9]',
        )}
      >
        <DraggableImage
          src={imageURI}
          alt={selected.alt}
          width={700}
          height={0}
          className='absolute max-w-none'
        />
        <div
          className={clsx(
            'pointer-events-none z-20 flex h-full flex-grow flex-col overflow-clip',
          )}
        >
          <p
            className={clsx(
              'pointer-events-none flex h-fit w-fit flex-col gap-y-1 overflow-clip p-4 outline-none *-[div]:pointer-events-auto *-[div]:w-fit *-[div]:max-w-full *-[div]:p-1 *-[div]:px-2',
              cardMode === 'dark' &&
                'text-card-dark *-[div]:bg-card-dark-background',
              cardMode === 'light' &&
                'text-card-light *-[div]:bg-card-light-background',
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
            'z-20 flex h-fit w-full border-t-2 bg-transparent p-4 py-6',
            isFooterDark && 'border-card-dark text-card-dark',
            !isFooterDark && 'border-card-light text-card-light',
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
