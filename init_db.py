import sqlite3

def init_db():
    conn = sqlite3.connect("schema.db")
    c = conn.cursor()

    c.execute("""
    CREATE TABLE IF NOT EXISTS aktiviteter (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        namn TEXT NOT NULL,
        tid TEXT,
        anvandare TEXT
    )
    """)

    conn.commit()
    conn.close()
    print("✅ Databasen är initierad!")

if __name__ == "__main__":
    init_db()
