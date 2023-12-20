import { z } from 'zod'

const SPOTIFY_IMAGE = z.object({
  height: z.number(),
  url: z.string(),
  width: z.number(),
})

const SPOTIFY_ARTIST = z.object({
  external_urls: z.object({
    spotify: z.string(),
  }),
  followers: z.object({
    href: z.any(),
    total: z.number(),
  }),
  genres: z.array(z.string()),
  href: z.string(),
  id: z.string(),
  images: z.array(SPOTIFY_IMAGE),
  name: z.string(),
  popularity: z.number(),
  type: z.string(),
  uri: z.string(),
})

const QUERY_PARSER = z.object({
  artists: z.object({
    href: z.string(),
    limit: z.number(),
    offset: z.number(),
    total: z.number(),
    next: z.string(),
    items: z.array(SPOTIFY_ARTIST),
  }),
})

export { QUERY_PARSER, SPOTIFY_ARTIST, SPOTIFY_IMAGE }

export type SearchArtistResponse = z.infer<typeof QUERY_PARSER>
export type SpotifyArtist = z.infer<typeof SPOTIFY_ARTIST>
export type SpotifyImage = z.infer<typeof SPOTIFY_IMAGE>
