'use client'

import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'
import { w } from '../lib/wretch'
import {
  LASTFM_ARTIST,
  LASTFM_ARTIST_RESPONSE,
} from '../api/search/lastfmParsers'

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
  result: LASTFM_ARTIST_RESPONSE | null
  selected: LASTFM_ARTIST | null
  pickArtist: (idx: number) => void
}

const useArtistQueryStore = create<ArtistQueryStore>()(
  subscribeWithSelector(
    devtools(
      persist(
        (set) => ({
          query: initialQuery?.query ?? '',
          setArtistQuery(query) {
            set(() => ({ query }))
          },
          loading: false,
          result: null,
          selected: null,
          pickArtist(idx) {
            set((s) => ({
              selected: s.result?.results.artistmatches.artist.at(idx),
            }))
          },
        }),
        {
          name: 'ArtistQueryStore',
          partialize: (state) => ({
            selected: state.selected,
          }),
        },
      ),
    ),
  ),
)

const DEBOUNCE_TIMEOUT = 300
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
      useArtistQueryStore.setState(() => ({ loading: false }))
      return
    }

    useArtistQueryStore.setState(() => ({ loading: true }))

    debounceTimer = setTimeout(async () => {
      const [controller, req] = w.get(`/api/search?q=${query}`).controller()

      abortController = controller

      const artists = await req.json<LASTFM_ARTIST_RESPONSE>().catch(() => null)

      if (!artists) {
        return
      }

      const lock = initialQuery?.initial

      if (lock) {
        initialQuery.initial = false
      }

      useArtistQueryStore.setState(() => ({
        result: artists,
        loading: false,
      }))
    }, DEBOUNCE_TIMEOUT)
  },
  {
    fireImmediately: true,
  },
)

export { useArtistQueryStore }
