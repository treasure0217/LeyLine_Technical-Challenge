const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.sqlite')

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS settlements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      partyA TEXT,
      partyB TEXT,
      amount INTEGER,
      status TEXT,
      response TEXT
    );
  `)

  console.log('Database initialized and table created.')
})

db.close()
