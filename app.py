from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)
DB_FILE = "schema.db"

def get_db_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/aktiviteter", methods=["GET"])
def get_aktiviteter():
    conn = get_db_connection()
    aktiviteter = conn.execute("SELECT * FROM aktiviteter").fetchall()
    conn.close()
    return jsonify([dict(a) for a in aktiviteter])

@app.route("/api/aktiviteter", methods=["POST"])
def add_aktiviteter():
    data = request.json
    conn = get_db_connection()
    for rad in data:
        conn.execute(
            "INSERT INTO aktiviteter (namn, tid, anvandare) VALUES (?, ?, ?)",
            (rad["namn"], rad["tid"], rad.get("anvandare", "okänd"))
        )
    conn.commit()
    conn.close()
    return jsonify({"status": "ok"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)  # Ändra porten här