'use client'

import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'

import type {
  SearchArtistResponse,
  SpotifyArtist,
} from '../api/search/spotifyParser'

interface ArtistQueryStore {
  query: string
  loading: boolean
  setArtistQuery: (query: string) => void
  result: SearchArtistResponse | null
  selected: SpotifyArtist | null
  pickArtist: (idx: number) => void
}

const useArtistQueryStore = create<ArtistQueryStore>()(
  subscribeWithSelector(
    devtools(
      persist(
        (set) => ({
          query: '',
          loading: false,
          result: null,
          selected: null,
          pickArtist(idx) {
            set((state) => ({
              ...state,
              selected: state.result?.artists.items.at(idx),
            }))
          },
          setArtistQuery(query) {
            set((state) => ({ ...state, query }))
          },
        }),
        {
          name: 'ArtistQueryStore',
          partialize: (state) => ({
            selected: state.selected,
          }),
        }
      )
    )
  )
)

let debounceTimer: NodeJS.Timer | null
const DEBOUNCE_TIMEOUT = 50

useArtistQueryStore.subscribe(
  (state) => state.query,
  (query, prevQuery) => {
    if (prevQuery === query) {
      return
    }

    if (debounceTimer !== null) {
      clearTimeout(debounceTimer)
    }

    if (query === '') {
      useArtistQueryStore.setState((prev) => ({ ...prev, loading: false }))
      return
    }

    useArtistQueryStore.setState((prev) => ({ ...prev, loading: true }))

    debounceTimer = setTimeout(async () => {
      const artists = (await (
        await fetch(`/api/search?q=${query}`)
      ).json()) as SearchArtistResponse

      useArtistQueryStore.setState((prevState) => ({
        ...prevState,
        result: artists,
        loading: false,
      }))
    }, DEBOUNCE_TIMEOUT)
  }
)

export { useArtistQueryStore }
