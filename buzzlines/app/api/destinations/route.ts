import { NextRequest, NextResponse } from 'next/server'

interface City {
  id: number
  name: string
}

interface Destinations {
  [key: string]: City[]
}

const destinations: Destinations = {
  '1': [
    { id: 2, name: 'Bradford' },
    { id: 3, name: 'Leeds' },
    { id: 4, name: 'Hull' },
  ],
  '2': [
    { id: 3, name: 'Leeds' },
    { id: 4, name: 'Hull' },
  ],
  '3': [{ id: 4, name: 'Hull' }],
  '5': [{ id: 1, name: 'Manchester' }],
}

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams
  console.log('query params', query)
  if (!query) {
    return NextResponse.json(
      { error: 'origin query param is required' },
      { status: 400 }
    )
  }

  const origin = query.get('origin') || ''
  const result = destinations[origin]
  if (result) {
    return NextResponse.json(result)
  }

  return NextResponse.json([])
}
