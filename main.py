from flask import Flask, request, jsonify
from flask_cors import CORS
from gita_bot import GitaRAGBot  # Adjust the import path if needed

app = Flask(__name__)
CORS(app, resources={r"/ask": {"origins": "http://localhost:5173"}})  # Match your frontend port

bot = GitaRAGBot()

@app.route('/ask', methods=['POST'])
def ask_gita():
    data = request.get_json()
    if not data or 'message' not in data:
        return jsonify({'error': 'Missing message field'}), 400

    user_message = data['message']
    response = bot.ask(user_message)
    print(response)
    print('--------------------------------------')
    print(jsonify({'response': response}))
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
