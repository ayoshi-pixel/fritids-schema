from flask import Flask, render_template, request, jsonify, send_from_directory
import json

app = Flask(__name__)

@app.route('/')
def index():
    try:
        with open('schema.json', 'r', encoding='utf-8') as f:
            schema = json.load(f)
    except:
        schema = {}
    return render_template('index.html', schema=schema)

@app.route('/save', methods=['POST'])
def save():
    data = request.get_json()
    with open('schema.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    return jsonify({"status": "sparat"})

@app.route('/service-worker.js')
def sw():
    return send_from_directory('.', 'service-worker.js')

if __name__ == '__main__':
    app.run(debug=True)