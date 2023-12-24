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
