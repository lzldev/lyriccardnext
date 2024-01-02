import { NextResponse } from 'next/server'

export const ServerErrorResponse = (error: any = null) =>
  new NextResponse(error !== null ? JSON.stringify(error) : null, {
    status: 500,
  })

export const InvalidDataResponse = () => {
  return new NextResponse(null, {
    status: 400,
  })
}
