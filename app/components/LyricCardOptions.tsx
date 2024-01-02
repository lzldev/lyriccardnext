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
    <div className='flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-6'>
      <div className='flex items-stretch justify-stretch gap-x-3'>
        <input
          ref={pickerRef}
          type='color'
          className='flex h-[2.6rem] w-full min-w-10 ring-white hover:ring-1'
          value={footerColor}
          onChange={(evt) => {
            setLyricCardStyle('footerColor', evt.currentTarget.value)
          }}
        />
      </div>
      <span className='text-dark-highlight flex items-center justify-center text-center'>
        S
      </span>
      <div className='flex first:*:rounded-l-xl last:*:rounded-r-xl'>
        <OptionButton style={'cardMode'} value={'light'} />
        <OptionButton style={'cardMode'} value={'dark'} />
      </div>
      <span className='text-dark-highlight flex items-center justify-center text-center'>
        F
      </span>
      <div className='flex first:*:rounded-l-xl last:*:rounded-r-xl'>
        <OptionButton style={'fontSize'} value={'sm'} />
        <OptionButton style={'fontSize'} value={'md'} />
        <OptionButton style={'fontSize'} value={'lg'} />
      </div>
      <span className='text-dark-highlight flex items-center justify-center text-center'>
        A
      </span>
      <div className='flex first:*:rounded-l-xl last:*:rounded-r-xl'>
        <OptionButton style={'lyricsAlign'} value={'bl'} />
        <OptionButton style={'lyricsAlign'} value={'br'} />
        <OptionButton style={'lyricsAlign'} value={'tl'} />
        <OptionButton style={'lyricsAlign'} value={'tr'} />
      </div>
      <div className='flex' id='bt-downloads'></div>
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
