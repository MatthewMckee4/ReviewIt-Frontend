from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow CORS for all routes

# Sample data
items = [
    {"id": 1, "name": "Item 1"},
    {"id": 2, "name": "Item 2"},
]


# Route to get all items
@app.route("/api/items", methods=["GET"])
def get_items():
    return jsonify(items)


# Route to add a new item
@app.route("/api/items", methods=["POST"])
def add_item():
    data = request.get_json()
    new_item = {"id": len(items) + 1, "name": data.get("name")}
    items.append(new_item)
    return jsonify(new_item), 201


if __name__ == "__main__":
    app.run(debug=True)
