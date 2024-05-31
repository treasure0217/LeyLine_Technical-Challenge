import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

export const openDB = async () => {
  return open({
    filename: './settlement.db',
    driver: sqlite3.Database,
  })
}

// Initialize the database
;(async () => {
  const db = await openDB()
  await db.exec(`
    CREATE TABLE IF NOT EXISTS settlements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      partyA TEXT,
      partyB TEXT,
      amount INTEGER,
      status TEXT,
      response TEXT
    );
  `)
})()
