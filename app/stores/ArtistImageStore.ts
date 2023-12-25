'use client'
import { create } from 'zustand'
import { LyricCardImageResponse } from '../api/artist/images/route'
import { subscribeWithSelector } from 'zustand/middleware'
import { useArtistQueryStore } from './ArtistQueryStore'
import { w } from '../lib/wretch'

interface ArtistImageStore {
  loading: boolean
  result: LyricCardImageResponse[] | null
  selected: LyricCardImageResponse | null
  pickImage: (idx: number) => void
}

const useArtistImageStore = create<ArtistImageStore>()(
  subscribeWithSelector((set) => ({
    loading: false,
    result: null,
    selected: null,
    pickImage: (idx) => {
      set((s) => ({ selected: s.result?.at(idx) }))
    },
  })),
)

useArtistQueryStore.subscribe(
  (s) => s.selected,
  async (artist) => {
    if (!artist) {
      return
    }

    useArtistImageStore.setState(() => ({
      loading: true,
      result:null,
    }))

    const res = await w
      .get(`/api/artist/images?a=${artist.name}`)
      .json<LyricCardImageResponse[]>()
      .catch((e) => {
        console.error(e)
      })

    if (!res) {
      useArtistImageStore.setState(() => ({
        loading: false,
      }))

      return
    }

    useArtistImageStore.setState(() => ({
      result: res,
      loading: false,
    }))
  },
)

export { useArtistImageStore }
