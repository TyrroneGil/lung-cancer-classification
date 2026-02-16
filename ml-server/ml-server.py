from fastapi import FastAPI
from database import get_connection
import sqlite3
app = FastAPI()



@app.get("/history")
def get_history():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM history")
    rows = cursor.fetchall()

    conn.close()

    return [dict(row) for row in rows]

@app.get('/addHistory')
def insert_history(image="hello", classification="hello", accuracy="hello", result="hello"):
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO history (image, classification, accuracy, result)
        VALUES (?, ?, ?, ?)
    """, (image, classification, accuracy, result))

    conn.commit()
    conn.close()
