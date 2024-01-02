const SPOTIFY_SEARCH = 'https://api.spotify.com/v1/search'
const AUTH_URL = 'https://accounts.spotify.com/api/token'

if (
  process.env.SPOTIFY_CLIENT_ID === '' ||
  !process.env.SPOTIFY_CLIENT_ID ||
  process.env.SPOTIFY_CLIENT_SECRET === '' ||
  !process.env.SPOTIFY_CLIENT_SECRET
) {
  throw 'Invalid SPOTIFY env vars'
}

const AUTH_HEADER = `Basic ${Buffer.from(
  `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
).toString('base64')}`

type SPOTIFY_TOKEN = {
  access_token: string
  token_type: string
  expires_in: number
}

export { AUTH_HEADER, AUTH_URL, SPOTIFY_SEARCH }

export type { SPOTIFY_TOKEN }
