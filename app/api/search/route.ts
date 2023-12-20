import { NextResponse } from 'next/server'
import { AUTH_URL, AUTH_HEADER, SPOTIFY_SEARCH } from './spotifyHelpers'
import { QUERY_PARSER } from './spotifyParser'

import type { SPOTIFY_TOKEN } from './spotifyHelpers'

let currentToken: SPOTIFY_TOKEN | null = null
let lastAuthTime: number

const Authenticate = async () => {
  const response = await fetch(AUTH_URL, {
    method: 'POST',
    headers: {
      Authorization: AUTH_HEADER,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
    }),
  })

  if (!response.ok) {
    throw `Invalid Spotify Credentials \n ${response.status} ${response.statusText}}`
  }

  const token = (await response.json()) as SPOTIFY_TOKEN

  lastAuthTime = new Date().getTime()
  currentToken = token
}

const getToken = () => {
  return `${currentToken!.token_type} ${currentToken!.access_token}`
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (query === null || query === undefined || query === '') {
    return new NextResponse(null, {
      status: 400,
    })
  }

  const timeSinceLastAuth = Math.floor(
    (new Date().getTime() - lastAuthTime) / 1000
  )

  if (currentToken === null || timeSinceLastAuth > currentToken?.expires_in) {
    await Authenticate()
  }

  const res = await fetch(`${SPOTIFY_SEARCH}?q=${query}&type=artist`, {
    headers: {
      Authorization: getToken(),
    },
  })

  const data = await res.json()
  const search = QUERY_PARSER.safeParse(data)

  if (!search.success) {
    return new NextResponse(null, {
      status: 400,
    })
  }

  return NextResponse.json(search.data)
}
