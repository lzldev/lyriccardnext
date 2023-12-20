'use client'

import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'

import type {
  SearchArtistResponse,
  SpotifyArtist,
} from '../api/search/spotifyParser'

interface ArtistQueryStore {
  query: string
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
      return
    }

    debounceTimer = setTimeout(async () => {
      const artists = (await (
        await fetch(`/api/search?q=${query}`)
      ).json()) as SearchArtistResponse

      useArtistQueryStore.setState((prevState) => ({
        ...prevState,
        result: artists,
      }))
    }, DEBOUNCE_TIMEOUT)
  }
)

export { useArtistQueryStore }
