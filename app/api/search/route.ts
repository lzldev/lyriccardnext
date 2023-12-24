import { NextResponse } from 'next/server'
import { ServerErrorResponse, InvalidDataResponse } from '../default_responses'
import { LASTFM_ARTIST_SEARCH, LASTFM_BASE } from './lastfmHelpers'
import { LASTFM_ARTIST_RESPONSE_PARSER } from './lastfmParsers'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const query = searchParams.get('q')

  if (typeof query !== 'string') {
    return InvalidDataResponse()
  }

  const url = LASTFM_ARTIST_SEARCH(query)
  const res = await fetch(url)

  if (!res.ok) {
    return ServerErrorResponse()
  }

  const _data = await res.json()

  const parse = LASTFM_ARTIST_RESPONSE_PARSER.safeParse(_data)

  if (!parse.success) {
    return ServerErrorResponse()
  }

  return NextResponse.json(parse.data)
}
