import { NextRequest, NextResponse } from 'next/server'
import { openDB } from '@/database/db'

export async function PUT(req: NextRequest) {
  const { id, amount } = await req.json()
  const db = await openDB()

  await db.run('UPDATE settlements SET amount = ?, status = ? WHERE id = ?', [
    amount,
    'pending',
    id,
  ])

  return NextResponse.json({ message: 'Settlement amount modified' })
}
