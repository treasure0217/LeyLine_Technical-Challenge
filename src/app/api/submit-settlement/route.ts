import { NextRequest, NextResponse } from 'next/server'
import { openDB } from '@/database/db'

export async function POST(req: NextRequest) {
  const { partyA, partyB, amount } = await req.json()
  const db = await openDB()

  await db.run(
    'INSERT INTO settlements (amount, status, response, partyA, partyB) VALUES (?, ?, ?, ?, ?)',
    [amount, 'pending', '', partyA, partyB],
  )

  return NextResponse.json({ message: 'Settlement amount submitted' })
}
