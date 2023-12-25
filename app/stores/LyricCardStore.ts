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
  setFooterColor: (color: string) => void
  cardMode: LyricCardModes
  setCardMode: (mode: LyricCardModes) => void
  fontSize: FontSizes
  setFontSize: (size: FontSizes) => void
}

const useLyricCardStore = create<LyricCardStore>()((set) => ({
  content: 'Click here to Edit this text<br/> or just paste some text',
  setContent: (evt) => {
    set({ content: xss(evt.currentTarget.innerHTML) })
  },
  footerContent: '"SONG NAME"',
  setFooterContent: (evt) => {
    set({ footerContent: xss(evt.currentTarget.innerHTML) })
  },
  footerColor: '#000000',
  setFooterColor: (color) => {
    set({
      footerColor: color,
    })
  },
  cardMode: 'dark',
  setCardMode: (mode) => {
    set({ cardMode: mode })
  },
  fontSize: 'md',
  setFontSize: (size) => {
    set({ fontSize: size })
  },
}))

export { useLyricCardStore }
