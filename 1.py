import requests

url = 'http://localhost:5000/ask'
data = {'message': 'What is my purpose?'}

response = requests.post(url, json=data)

print("Server says:", response.json())
