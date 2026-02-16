import sqlite3

conn = sqlite3.connect("database.db")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image TEXT,
    classification TEXT,
    accuracy REAL,
    result TEXT
)
""")

conn.commit()   # ← VERY IMPORTANT
conn.close()
