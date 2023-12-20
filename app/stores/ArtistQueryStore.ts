'use client'

import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'

import type {
  SearchArtistResponse,
  SpotifyArtist,
} from '../api/search/spotifyParser'
import { w } from '../lib/wretch'

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
const DEBOUNCE_TIMEOUT = 100
let abortController: AbortController

useArtistQueryStore.subscribe(
  (state) => state.query,
  (query, prevQuery) => {
    if (prevQuery === query) {
      return
    }

    if (debounceTimer !== null) {
      abortController?.abort('Debounce')
      clearTimeout(debounceTimer)
    }

    if (query === '') {
      useArtistQueryStore.setState((prev) => ({ ...prev, loading: false }))
      return
    }

    useArtistQueryStore.setState((prev) => ({ ...prev, loading: true }))

    debounceTimer = setTimeout(async () => {
      const [controller, req] = await w
        .get(`/api/search?q=${query}`)
        .controller()

      abortController = controller

      const artists = await req
        .json<SearchArtistResponse>()
        .catch((r) => console.log('e:abort'))

      if (!artists) {
        return
      }

      useArtistQueryStore.setState((prevState) => ({
        ...prevState,
        result: artists,
        loading: false,
      }))
    }, DEBOUNCE_TIMEOUT)
  }
)

export { useArtistQueryStore }
