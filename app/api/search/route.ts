import { NextResponse } from 'next/server'
import {
  AUTH_URL,
  AUTH_HEADER,
  type SPOTIFY_TOKEN,
  SPOTIFY_SEARCH,
} from './spotifyHelpers'
import { QUERY_PARSER } from './spotifyParser'

let currentToken: SPOTIFY_TOKEN | null = null
let lastAuthTime: number

const Authenticate = async () => {
  const token = (await (
    await fetch(AUTH_URL, {
      method: 'POST',
      headers: {
        Authorization: AUTH_HEADER,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
      }),
    })
  ).json()) as SPOTIFY_TOKEN

  lastAuthTime = new Date().getTime()
  currentToken = token
}

const getToken = () => {
  return `${currentToken!.token_type} ${currentToken!.access_token}`
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (query === null || query === undefined) {
    return new NextResponse(null, {
      status: 400,
    })
  }

  if (query === '') {
    return new NextResponse(null, {
      status: 200,
    })
  }

  const timeSinceLastAuth = Math.floor(
    (new Date().getTime() - lastAuthTime) / 1000
  )

  if (currentToken === null || timeSinceLastAuth > currentToken?.expires_in) {
    await Authenticate()
  }

  const search = QUERY_PARSER.safeParse(
    await (
      await fetch(`${SPOTIFY_SEARCH}?q=${query}&type=artist`, {
        headers: {
          Authorization: getToken(),
        },
      })
    ).json()
  )

  if (!search.success) {
    return NextResponse.next({
      status: 400,
    })
  }

  return NextResponse.json(search.data)
}
