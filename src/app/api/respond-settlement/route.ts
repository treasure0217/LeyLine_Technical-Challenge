import { NextRequest, NextResponse } from 'next/server'
import { openDB } from '@/database/db'

export async function PUT(req: NextRequest) {
  const { id, response } = await req.json()
  const db = await openDB()
  const status = response === 'agree' ? 'settled' : 'disputed'

  await db.run('UPDATE settlements SET response = ?, status = ? WHERE id = ?', [
    response,
    status,
    id,
  ])

  return NextResponse.json({ message: `Settlement ${status}` })
}
