'use client'

import xss from 'xss'
import { create } from 'zustand'
import type { FocusEvent } from 'react'

const LyricCardModes = ['dark', 'light'] as const
const FontSizes = ['md', 'lg', 'sm'] as const

export type LyricCardModes = (typeof LyricCardModes)[number]
export type FontSizes = (typeof FontSizes)[number]

interface LyricCardStore {
  content: string
  setContent: (evt: FocusEvent<HTMLDivElement, Element>) => void
  footerContent: string
  setFooterContent: (evt: FocusEvent<HTMLDivElement, Element>) => void
  footerColor: string
  cardMode: LyricCardModes
  fontSize: FontSizes
  setLyricCardStyle: <
    TStyle extends keyof Pick<
      LyricCardStore,
      'fontSize' | 'cardMode' | 'footerColor'
    >,
  >(
    style: TStyle,
    value: LyricCardStore[TStyle],
  ) => void
}

const useLyricCardStore = create<LyricCardStore>()((set) => ({
  content: 'Click here to Edit this text<br/> or just paste something',
  setContent: (evt) => {
    set({ content: xss(evt.currentTarget.innerHTML) })
  },
  footerContent: '"SONG NAME"',
  setFooterContent: (evt) => {
    set({ footerContent: xss(evt.currentTarget.innerHTML) })
  },
  footerColor: '#000000',
  cardMode: 'dark',
  fontSize: 'md',
  setLyricCardStyle: (style, value) => {
    set({ [style]: value })
  },
}))

export { useLyricCardStore }
