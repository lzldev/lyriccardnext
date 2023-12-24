import { z } from 'zod'

const LASTFM_IMAGE_PARSER = z.object({
  '#text': z.string(),
  size: z.string(),
})

const LASTFM_ARITST_PARSER = z.object({
  name: z.string(),
  mbid: z.string(),
  url: z.string(),
  streamable: z.number({
    coerce: true,
  }),
  listeners: z.number({
    coerce: true,
  }),
  image: z.array(LASTFM_IMAGE_PARSER),
})

const LASTFM_ARTIST_RESPONSE_PARSER = z.object({
  results: z.object({
    artistmatches: z.object({
      artist: z.array(LASTFM_ARITST_PARSER),
    }),
    // Not used ---
    // 'opensearch:Query': z.object({
    //   '#text': z.string(),
    //   role: z.string(),
    //   searchTerms: z.string(),
    //   startPage: z.string(),
    // }),
    // 'opensearch:totalResults': z.string(),
    // 'opensearch:startIndex': z.string(),
    // 'opensearch:itemsPerPage': z.string(),
    // '@attr': z.object({
    //   for: z.string(),
    // }),
  }),
})

export { LASTFM_ARTIST_RESPONSE_PARSER }

export type LASTFM_IMAGE = z.infer<typeof LASTFM_IMAGE_PARSER>
export type LASTFM_ARTIST = z.infer<typeof LASTFM_ARITST_PARSER>
export type LASTFM_ARTIST_RESPONSE = z.infer<
  typeof LASTFM_ARTIST_RESPONSE_PARSER
>
