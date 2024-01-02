'use client'
import { create } from 'zustand'
import {
  ArtistImagesResponse,
  LyricCardImage,
} from '../api/artist/images/route'
import { subscribeWithSelector } from 'zustand/middleware'
import { useArtistQueryStore } from './ArtistQueryStore'
import { w } from '../lib/wretch'

interface ArtistImageStore {
  loading: boolean
  result: LyricCardImage[] | null
  page: number
  hasNextPage: boolean
  selected: LyricCardImage | null
  pickImage: (idx: number) => void
  nextPage: () => void
}

const useArtistImageStore = create<ArtistImageStore>()(
  subscribeWithSelector((set) => ({
    loading: false,
    result: null,
    page: 1,
    hasNextPage: false,
    selected: null,
    pickImage: (idx) => {
      set((s) => ({ selected: s.result?.at(idx) }))
    },
    nextPage: () => {
      set((s) => ({ page: s.page + 1, loading: true }))

      updateImages()
    },
  })),
)

useArtistQueryStore.subscribe(
  (s) => s.selected,
  (artist) => {
    if (!artist) {
      useArtistImageStore.setState(() => ({
        page: 1,
        hasNextPage: false,
        result: null,
      }))

      return
    }

    useArtistImageStore.setState(() => ({
      loading: true,
      page: 1,
      hasNextPage: false,
      result: null,
    }))

    updateImages()
  },
)

const updateImages = async () => {
  const { selected: artist } = useArtistQueryStore.getState()

  if (!artist) return

  const { nextPage, page } = useArtistImageStore.getState()

  const data = await w
    .get(`/api/artist/images?a=${artist.name}&p=${page}`)
    .json<ArtistImagesResponse>()
    .catch((e) => {
      console.error(e)
    })

  if (!data) {
    useArtistImageStore.setState(() => ({
      loading: false,
    }))

    return
  }

  useArtistImageStore.setState((s) => ({
    result: s.result ? [...s.result, ...data.result] : data.result,
    hasNextPage: data.hasNextPage,
    loading: false,
  }))
}

export { useArtistImageStore }
