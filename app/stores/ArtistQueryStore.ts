'use client'

import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'
import type {
  SearchArtistResponse,
  SpotifyArtist,
} from '../api/search/spotifyParser'
import { w } from '../lib/wretch'

const initialQuery = (() => {
  if (typeof window === 'undefined') {
    return null
  }

  let query
  try {
    query = new URL(window.location.toString())
  } catch {
    return
  }

  const qr = query.searchParams.get('query')

  if (!qr) {
    return null
  }

  return {
    query: qr,
    initial: true,
  }
})()

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
          query: initialQuery?.query ?? '',
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

const DEBOUNCE_TIMEOUT = 100
let debounceTimer: NodeJS.Timer | null
let abortController: AbortController

useArtistQueryStore.subscribe(
  (state) => state.query,
  (query, prevQuery) => {
    if (!initialQuery?.initial && prevQuery === query) {
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

      const artists = await req.json<SearchArtistResponse>().catch(() => null)

      if (!artists) {
        return
      }

      const lock = initialQuery?.initial
      if (lock) {
        initialQuery.initial = false
      }

      useArtistQueryStore.setState((prevState) => ({
        ...prevState,
        result: artists,
        loading: false,
        selected: lock ? artists.artists.items.at(0) : prevState.selected,
      }))
    }, DEBOUNCE_TIMEOUT)
  },
  {
    fireImmediately: true,
  }
)

export { useArtistQueryStore }
