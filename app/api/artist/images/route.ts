import { NextRequest, NextResponse } from 'next/server'
import { InvalidDataResponse } from '../../default_responses'
import { LASTFM_ARTIST_PROFILE } from '../../search/lastfmHelpers'
import * as cheerio from 'cheerio'

export type LyricCardImageResponse = {
  src: string
  alt: string
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const artist = searchParams.get('a')
  const pagination = searchParams.get('page')

  if (!artist) {
    return InvalidDataResponse()
  }

  const res = await fetch(LASTFM_ARTIST_PROFILE(artist))
  const data = await res.text()

  const page = cheerio.load(data)

  const images: LyricCardImageResponse[] = []
  const srcSet = new Set<string>()

  page('.image-list-item>img:first-of-type').each((_, el) => {
    if (srcSet.has(el.attribs['src'])) return
    srcSet.add(el.attribs['src'])

    images.push({
      src: el.attribs['src'],
      alt: el.attribs['alt'],
    })
  })

  console.log(images.length, page('.image-list-item>img').length)

  return NextResponse.json(images)
}
