import { z } from 'zod'

const lastfm = {
  api_key: process.env['LASTFM_KEY'],
  api_secret: process.env['LASTFM_SECRET'],
}

z.object({
  api_key: z.string({
    description: 'LAST FM API KEY',
  }),
  api_secret: z.string({
    description: 'LAST FM API SECRET',
  }),
}).parse(lastfm)

export const LASTFM_BASE = `http://ws.audioscrobbler.com/2.0/?format=json&api_key=${lastfm.api_key}`
export const LASTFM_ARTIST_SEARCH = (query: string) =>
  LASTFM_BASE + `&method=artist.search&limit=5&artist=${query}`

export const LASTFM_ARTIST_PROFILE = (artist: string) =>
  `https://www.last.fm/music/${artist}`

export const LASTFM_ARTIST_IMAGES = (
  artist: string,
  params?: {
    page?: string
  },
) => {
  const searchParams = (() => {
    if (!params) {
      return ''
    }

    let search = '?'

    if (params.page) {
      try {
        const n = parseInt(params.page)
        search += `&page=${n}`
      } catch {}
    }
    return search
  })()

  return LASTFM_ARTIST_PROFILE(artist) + `/+images` + searchParams
}
