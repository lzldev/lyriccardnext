'use client'

import xss from 'xss'
import { create } from 'zustand'
import type { FocusEvent } from 'react'

const LyricCardModes = ['dark', 'light'] as const
const FontSizes = ['md', 'lg', 'sm'] as const
const TextCorners = ['br', 'bl', 'tr', 'tl'] as const

const defaultContent = `
<div>Click here to Edit this text</div>
<div>or just paste something</div>`

export type LyricCardModes = (typeof LyricCardModes)[number]
export type FontSizes = (typeof FontSizes)[number]
export type LyricCorners = (typeof TextCorners)[number]

export interface LyricCardStore {
  content: string
  setContent: (evt: FocusEvent<HTMLDivElement, Element>) => void
  footerContent: string
  setFooterContent: (evt: FocusEvent<HTMLDivElement, Element>) => void
  footerColor: string
  cardMode: LyricCardModes
  fontSize: FontSizes
  lyricsAlign: LyricCorners
  setLyricCardStyle: <
    TStyle extends keyof Pick<
      LyricCardStore,
      'fontSize' | 'cardMode' | 'footerColor' | 'lyricsAlign'
    >,
  >(
    style: TStyle,
    value: LyricCardStore[TStyle],
  ) => void
}

const useLyricCardStore = create<LyricCardStore>()((set) => ({
  content: defaultContent,
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
  lyricsAlign: 'bl',
  setLyricCardStyle: (style, value) => {
    set({ [style]: value })
  },
}))

export { useLyricCardStore }
