import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = new NextResponse()

  console.log('middleware ->')
}

export const config = {
  matcher: '/api/:path*',
}
