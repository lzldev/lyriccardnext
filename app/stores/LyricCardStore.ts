'use client'

import xss from 'xss'
import { create } from 'zustand'
import type { FocusEvent } from 'react'

interface LyricCardStore {
  content: string
  setContent: (evt: FocusEvent<HTMLDivElement, Element>) => void
  footerContent: string
  setFooterContent: (evt: FocusEvent<HTMLDivElement, Element>) => void
  footerColor: string
  setFooterColor: (color: string) => void
}

const useLyricCardStore = create<LyricCardStore>()((set) => ({
  content: 'Click here to Edit this text<br/> or just paste some text',
  setContent: (evt) => {
    set({ content: (xss(evt.currentTarget.innerHTML)) })
  },
  footerContent: '"SONG NAME"',
  setFooterContent: (evt) => {
    set({ footerContent: (xss(evt.currentTarget.innerHTML)) })
  },
  footerColor: '#000000',
  setFooterColor: (color) => {
    set({
      footerColor: color,
    })
  },
}))

export { useLyricCardStore }
