import { NextRequest, NextResponse } from 'next/server'
import { InvalidDataResponse } from '../../default_responses'
import {
  LASTFM_ARTIST_IMAGES,
  LASTFM_ARTIST_PROFILE,
} from '../../search/lastfmHelpers'
import * as cheerio from 'cheerio'

export type LyricCardImage = {
  src: string
  alt: string
}

export type ArtistImagesResponse = {
  result: LyricCardImage[]
  hasNextPage: boolean
}

export async function GET(
  request: NextRequest,
): Promise<NextResponse<ArtistImagesResponse>> {
  const { searchParams } = new URL(request.url)

  const artist = searchParams.get('a')
  const pagination = searchParams.get('p')

  if (!artist) {
    throw InvalidDataResponse()
  }

  const res = await fetch(
    LASTFM_ARTIST_IMAGES(artist, pagination ? { page: pagination } : undefined),
  )

  const data = await res.text()

  const page = cheerio.load(data)

  const images: LyricCardImage[] = []

  page('.image-list-item>img:first-of-type').each((_, el) => {
    images.push({
      src: el.attribs['src'],
      alt: el.attribs['alt'],
    })
  })

  const hasNextPage = !!page('.pagination-next').length

  return NextResponse.json({
    result: images,
    hasNextPage,
  })
}
