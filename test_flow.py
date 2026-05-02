import urllib.request
import urllib.error
import json

BASE_URL = "http://127.0.0.1:8000/api/accounts"
username = "testuser8"
email = "testuser8@example.com"
password = "testpassword123"

def request(url, data=None, headers=None):
    if data is not None:
        data = json.dumps(data).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers=headers or {})
    if data is not None:
        req.add_header('Content-Type', 'application/json')
    try:
        with urllib.request.urlopen(req) as response:
            return response.getcode(), response.read().decode('utf-8')
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode('utf-8')
    except Exception as e:
        return 0, str(e)

print("--- 1. Testing Signup ---")
code, text = request(f"{BASE_URL}/signup/", {"username": username, "email": email, "password": password})
print(code, text)
if code != 201:
    print("Signup failed, trying login")
    code, text = request(f"{BASE_URL}/login/", {"email": email, "password": password})
    print(code, text)

data = json.loads(text)
token = data.get("token")
headers = {"Authorization": f"Bearer {token}"}

print("\n--- 2. Testing Update Cart ---")
code, text = request(f"{BASE_URL}/cart/update/", {"items": [{"productId": 1, "qty": 2, "price": 20}]}, headers)
print(code, text)

print("\n--- 3. Testing Checkout ---")
code, text = request(f"{BASE_URL}/checkout/", {
    "items": [{"productId": 1, "qty": 2, "price": 20}],
    "name": "Test Name",
    "phone": "123456789",
    "location": "Test Location",
    "total": 40
}, headers)
print(code, text)
