import { NextResponse } from 'next/server'

const origins = [
  { id: 1, name: 'Manchester' },
  { id: 2, name: 'Bradford' },
  { id: 3, name: 'Leeds' },
  { id: 5, name: 'Liverpool' },
]

export async function GET() {
  return NextResponse.json(origins)
}
