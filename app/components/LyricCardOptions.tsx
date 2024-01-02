'use client'

import { Icon } from '@iconify/react'
import { useMemo, useRef } from 'react'
import { useArtistImageStore } from '../stores/ArtistImageStore'
import {
  type LyricCardStore,
  useLyricCardStore,
} from '../stores/LyricCardStore'
import { TwcComponentProps, twc } from 'react-twc'
import { isDark } from '../utils/colors'
import clsx from 'clsx'

const LyricCardOptions = () => {
  const selected = useArtistImageStore((s) => s.selected)
  const { footerColor, setLyricCardStyle } = useLyricCardStore((s) => ({
    footerColor: s.footerColor,
    setLyricCardStyle: s.setLyricCardStyle,
  }))

  const isFooterDark = useMemo(() => isDark(footerColor), [footerColor])

  const pickerRef = useRef<HTMLInputElement>(null)

  if (!selected) {
    return <></>
  }

  return (
    <div className='flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-6'>
      <div
        className='relative flex cursor-pointer items-center justify-center gap-x-7 overflow-clip rounded-xl px-3 ring-1 ring-dark-highlight *:cursor-pointer'
        onClick={() => {
          pickerRef.current?.showPicker()
        }}
      >
        <div
          className='absolute inset-0 -z-10 h-full min-h-full w-full min-w-full'
          style={{ backgroundColor: footerColor }}
        />
        <span className='flex items-center justify-center text-center text-dark-highlight'>
          <Icon
            icon='fluent:color-24-filled'
            className={clsx(
              'size-[24px]',
              !isFooterDark && '*:fill-dark-background',
              isFooterDark && ' *:fill-dark-highlight',
            )}
          />
        </span>
        <input
          ref={pickerRef}
          type='color'
          className='flex h-[2.6rem] w-full min-w-10 ring-white'
          value={footerColor}
          onChange={(evt) => {
            setLyricCardStyle('footerColor', evt.currentTarget.value)
          }}
        />
      </div>
      <div className='flex gap-x-2'>
        <span className='flex items-center justify-center text-center text-dark-highlight'>
          <Icon
            icon='fluent:dark-theme-24-filled'
            className='size-[24px] *:fill-dark-highlight'
          />
        </span>
        <div className='flex first:*:rounded-l-xl last:*:rounded-r-xl'>
          <OptionButton style={'cardMode'} value={'light'} />
          <OptionButton style={'cardMode'} value={'dark'} />
        </div>
      </div>
      <div className='flex gap-x-2'>
        <span className='flex items-center justify-center text-center text-dark-highlight'>
          <Icon
            icon='fluent:text-font-size-24-filled'
            className='size-[24px] *:fill-dark-highlight'
          />
        </span>
        <div className='flex first:*:rounded-l-xl last:*:rounded-r-xl'>
          <OptionButton style={'fontSize'} value={'sm'} />
          <OptionButton style={'fontSize'} value={'md'} />
          <OptionButton style={'fontSize'} value={'lg'} />
        </div>
      </div>
      <div className='flex gap-x-2'>
        <span className='flex items-center justify-center text-center text-dark-highlight'>
          <Icon
            icon='streamline:interface-setting-menu-2-alternate-button-parallel-horizontal-lines-menu-navigation-staggered-thick'
            className='size-[24px] *:fill-dark-highlight'
          />
        </span>
        <div className='flex first:*:rounded-l-xl last:*:rounded-r-xl'>
          <OptionButton style={'lyricsAlign'} value={'bl'} />
          <OptionButton style={'lyricsAlign'} value={'br'} />
          <OptionButton style={'lyricsAlign'} value={'tl'} />
          <OptionButton style={'lyricsAlign'} value={'tr'} />
        </div>
      </div>
    </div>
  )
}

export { LyricCardOptions }

type _OptionButtonProps = TwcComponentProps<'div'> & { $active?: boolean }

const _OptionButton = twc.div<_OptionButtonProps>((props) => [
  `hover:bg-dark hover:text-accent transition-all duration-75 py-2 px-3 hover:cursor-pointer min-w-10 text-center`,
  !props.$active && 'bg-dark-background-dimmed',
  props.$active && 'bg-accent text-dark-highlight',
])
const OptionButton = <
  TStyle extends keyof Pick<
    LyricCardStore,
    'fontSize' | 'cardMode' | 'footerColor' | 'lyricsAlign'
  >,
>(props: {
  style: TStyle
  value: LyricCardStore[TStyle]
}) => {
  const { setLyricCardStyle, value } = useLyricCardStore((s) => ({
    setLyricCardStyle: s.setLyricCardStyle,
    value: s[props.style],
  }))

  const $active = value === props.value

  return (
    <_OptionButton
      $active={$active}
      onClick={() => {
        setLyricCardStyle(props.style, props.value)
      }}
    >
      {props.value}
    </_OptionButton>
  )
}
