'use client'

import { useRef } from 'react'
import { useArtistImageStore } from '../stores/ArtistImageStore'
import {
  type LyricCardStore,
  useLyricCardStore,
} from '../stores/LyricCardStore'
import { TwcComponentProps, twc } from 'react-twc'

const LyricCardOptions = () => {
  const selected = useArtistImageStore((s) => s.selected)
  const { footerColor, setLyricCardStyle } = useLyricCardStore((s) => ({
    footerColor: s.footerColor,
    setLyricCardStyle: s.setLyricCardStyle,
  }))

  const pickerRef = useRef(null)

  if (!selected) {
    return <></>
  }

  return (
    <div className='flex h-12 w-full flex-wrap items-center justify-center gap-x-6 gap-y-6'>
      <div className='flex items-center gap-x-3'>
        <span>Footer</span>
        <input
          ref={pickerRef}
          type='color'
          className='ring-white hover:ring-1'
          value={footerColor}
          onChange={(evt) => {
            setLyricCardStyle('footerColor', evt.currentTarget.value)
          }}
        />
      </div>
      <div className='flex gap-x-3'>
        <span className='flex items-center justify-center text-center'>S</span>
        <OptionButton style={'cardMode'} value={'light'} />
        <OptionButton style={'cardMode'} value={'dark'} />
      </div>
      <div className='flex gap-x-3'>
        <span className='flex items-center justify-center text-center'>F</span>
        <OptionButton style={'fontSize'} value={'sm'} />
        <OptionButton style={'fontSize'} value={'md'} />
        <OptionButton style={'fontSize'} value={'lg'} />
      </div>
      <div className='flex gap-x-3'>
        <span className='flex items-center justify-center text-center'>F</span>
        <OptionButton style={'lyricsAlign'} value={'bl'} />
        <OptionButton style={'lyricsAlign'} value={'br'} />
        <OptionButton style={'lyricsAlign'} value={'tl'} />
        <OptionButton style={'lyricsAlign'} value={'tr'} />
      </div>
      <div className='flex gap-x-3' id='bt-downloads'></div>
    </div>
  )
}

export { LyricCardOptions }

type _OptionButtonProps = TwcComponentProps<'div'> & { $active?: boolean }

const _OptionButton = twc.div<_OptionButtonProps>((props) => [
  `bg-accent-dark hover:bg-dark hover:text-accent transition-all duration-75 py-2 px-3 hover:cursor-pointer min-w-10 text-center`,
  props.$active && `bg-accent`,
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
