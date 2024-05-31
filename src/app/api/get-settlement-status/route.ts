// app/api/getSettlementStatus/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { openDB } from '@/database/db'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const partyA = searchParams.get('partyA')
  const partyB = searchParams.get('partyB')

  const db = await openDB()

  if (id) {
    const settlement = await db.all('SELECT * FROM settlements WHERE id = ?', [
      id,
    ])

    console.log(settlement)

    return NextResponse.json({ settlement })
  }

  if (partyA) {
    const settlement = await db.all(
      'SELECT * FROM settlements WHERE partyA = ?',
      [partyA],
    )

    return NextResponse.json({ settlement })
  }

  if (partyB) {
    const settlement = await db.all(
      'SELECT * FROM settlements WHERE partyB = ?',
      [partyB],
    )

    return NextResponse.json({ settlement })
  }
}
