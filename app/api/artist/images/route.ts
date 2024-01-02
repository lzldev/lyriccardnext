import { NextRequest, NextResponse } from 'next/server'
import { InvalidDataResponse } from '../../default_responses'
import {
  LASTFM_ARTIST_IMAGES,
  LASTFM_ARTIST_PROFILE,
} from '../../search/lastfmHelpers'
import * as cheerio from 'cheerio'

export type LyricCardImageResponse = {
  src: string
  alt: string
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const artist = searchParams.get('a')
  const pagination = searchParams.get('p')

  if (!artist) {
    return InvalidDataResponse()
  }

  const res = await fetch(
    LASTFM_ARTIST_IMAGES(artist, pagination ? { page: pagination } : undefined),
  )

  const data = await res.text()

  const page = cheerio.load(data)

  const images: LyricCardImageResponse[] = []

  page('.image-list-item>img:first-of-type').each((_, el) => {
    images.push({
      src: el.attribs['src'],
      alt: el.attribs['alt'],
    })
  })

  return NextResponse.json(images)
}
