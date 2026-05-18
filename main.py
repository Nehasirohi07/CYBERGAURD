import os
import hashlib
import base64
import json
import re
import urllib.parse
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
import ollama

# Load environment variables
load_dotenv()

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

# --- Ollama local inference config ---
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "smollm2:135m")
OLLAMA_HOST  = os.getenv("OLLAMA_HOST",  "http://localhost:11434")

print(f"[CyberGuard] Using Ollama model: {OLLAMA_MODEL} at {OLLAMA_HOST}")

# --- Rainbow Table for Dehasher Demo ---
COMMON_WORDS = [
    "password", "123456", "12345678", "admin", "qwerty", "iloveyou",
    "letmein", "welcome", "monkey", "dragon", "master", "shadow",
    "sunshine", "princess", "abc123", "passw0rd", "football", "baseball",
    "secret", "hello", "world", "test", "user", "guest", "root",
    "cybersec", "hacker", "security", "network", "internet"
]

DEHASH_TABLE = {}
for word in COMMON_WORDS:
    DEHASH_TABLE[hashlib.md5(word.encode()).hexdigest()] = word
    DEHASH_TABLE[hashlib.sha1(word.encode()).hexdigest()] = word
    DEHASH_TABLE[hashlib.sha256(word.encode()).hexdigest()] = word
    DEHASH_TABLE[hashlib.sha512(word.encode()).hexdigest()] = word

# ─────────────────────────────────────────────
#  SERVE STATIC PAGES
# ─────────────────────────────────────────────
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory('.', filename)

# ─────────────────────────────────────────────
#  API: PASSWORD STRENGTH
# ─────────────────────────────────────────────
@app.route('/api/password-strength', methods=['POST'])
def check_password_strength():
    data = request.json
    password = data.get('password', '')
    score = 0
    feedback = []
    criteria = {}

    criteria['length'] = len(password) >= 8
    criteria['uppercase'] = any(c.isupper() for c in password)
    criteria['lowercase'] = any(c.islower() for c in password)
    criteria['digits'] = any(c.isdigit() for c in password)
    criteria['special'] = bool(re.search(r'[!@#$%^&*()\-_=+\[\]{}|;:\'",.<>?/`~\\]', password))

    if len(password) >= 12: score += 2
    elif len(password) >= 8: score += 1
    else: feedback.append("Use at least 8 characters (12+ recommended).")

    if criteria['uppercase']: score += 1
    else: feedback.append("Add uppercase letters (A-Z).")

    if criteria['lowercase']: score += 1
    else: feedback.append("Add lowercase letters (a-z).")

    if criteria['digits']: score += 1
    else: feedback.append("Include numbers (0-9).")

    if criteria['special']: score += 1
    else: feedback.append("Include special characters (!@#$...).")

    if score >= 5: strength = "Very Strong"
    elif score >= 4: strength = "Strong"
    elif score == 3: strength = "Moderate"
    elif score == 2: strength = "Weak"
    else: strength = "Very Weak"

    entropy = len(password) * 6.55
    time_to_crack = estimate_crack_time(len(password), criteria)

    return jsonify({
        'score': score,
        'max_score': 6,
        'strength': strength,
        'feedback': feedback,
        'criteria': criteria,
        'entropy': round(entropy, 1),
        'time_to_crack': time_to_crack
    })

def estimate_crack_time(length, criteria):
    charset = 0
    if criteria.get('lowercase'): charset += 26
    if criteria.get('uppercase'): charset += 26
    if criteria.get('digits'): charset += 10
    if criteria.get('special'): charset += 32
    if charset == 0: return "Instant"
    combinations = charset ** length
    guesses_per_second = 1e10
    seconds = combinations / guesses_per_second
    if seconds < 1: return "Instant"
    if seconds < 60: return f"{int(seconds)} seconds"
    if seconds < 3600: return f"{int(seconds/60)} minutes"
    if seconds < 86400: return f"{int(seconds/3600)} hours"
    if seconds < 31536000: return f"{int(seconds/86400)} days"
    if seconds < 3153600000: return f"{int(seconds/31536000)} years"
    return "Centuries"

# ─────────────────────────────────────────────
#  API: HASHER
# ─────────────────────────────────────────────
@app.route('/api/hash', methods=['POST'])
def generate_hash():
    data = request.json
    text = data.get('text', '')
    algorithms = data.get('algorithms', ['md5', 'sha1', 'sha256'])
    results = {}
    for algo in algorithms:
        try:
            h = hashlib.new(algo, text.encode())
            results[algo] = h.hexdigest()
        except Exception:
            results[algo] = "Unsupported algorithm"
    return jsonify({'results': results})

# ─────────────────────────────────────────────
#  API: DEHASHER
# ─────────────────────────────────────────────
@app.route('/api/dehash', methods=['POST'])
def dehash():
    data = request.json
    hash_value = data.get('hash', '').lower().strip()
    if hash_value in DEHASH_TABLE:
        return jsonify({'result': DEHASH_TABLE[hash_value], 'found': True})
    return jsonify({'result': 'Not found in dictionary. Hashes are one-way — this is cryptographically secure!', 'found': False})

# ─────────────────────────────────────────────
#  API: BASE64
# ─────────────────────────────────────────────
@app.route('/api/base64', methods=['POST'])
def base64_tool():
    data = request.json
    text = data.get('text', '')
    action = data.get('action', 'encode')
    try:
        if action == 'encode':
            result = base64.b64encode(text.encode()).decode()
        else:
            result = base64.b64decode(text.encode()).decode()
        return jsonify({'result': result, 'success': True})
    except Exception as e:
        return jsonify({'result': f'Error: {str(e)}', 'success': False})

# ─────────────────────────────────────────────
#  API: URL ENCODER/DECODER
# ─────────────────────────────────────────────
@app.route('/api/url-encode', methods=['POST'])
def url_encode():
    data = request.json
    text = data.get('text', '')
    action = data.get('action', 'encode')
    try:
        if action == 'encode':
            result = urllib.parse.quote(text)
        else:
            result = urllib.parse.unquote(text)
        return jsonify({'result': result, 'success': True})
    except Exception as e:
        return jsonify({'result': f'Error: {str(e)}', 'success': False})

# ─────────────────────────────────────────────
#  API: CAESAR CIPHER
# ─────────────────────────────────────────────
@app.route('/api/caesar', methods=['POST'])
def caesar_cipher():
    data = request.json
    text = data.get('text', '')
    shift = int(data.get('shift', 3))
    action = data.get('action', 'encrypt')
    if action == 'decrypt':
        shift = -shift
    result = []
    for char in text:
        if char.isalpha():
            base = ord('A') if char.isupper() else ord('a')
            result.append(chr((ord(char) - base + shift) % 26 + base))
        else:
            result.append(char)
    return jsonify({'result': ''.join(result), 'success': True})

# ─────────────────────────────────────────────
#  API: JWT DECODER
# ─────────────────────────────────────────────
@app.route('/api/jwt-decode', methods=['POST'])
def jwt_decode():
    data = request.json
    token = data.get('token', '').strip()
    parts = token.split('.')
    if len(parts) != 3:
        return jsonify({'error': 'Invalid JWT format. Must have 3 parts separated by dots.', 'success': False})
    try:
        def pad(s):
            return s + '=' * (4 - len(s) % 4) if len(s) % 4 else s
        header = json.loads(base64.urlsafe_b64decode(pad(parts[0])).decode())
        payload = json.loads(base64.urlsafe_b64decode(pad(parts[1])).decode())
        return jsonify({
            'header': header,
            'payload': payload,
            'signature': parts[2],
            'success': True
        })
    except Exception as e:
        return jsonify({'error': str(e), 'success': False})

# ─────────────────────────────────────────────
#  API: IP GEOLOCATION (using public API)
# ─────────────────────────────────────────────
@app.route('/api/ip-lookup', methods=['POST'])
def ip_lookup():
    import urllib.request
    data = request.json
    ip = data.get('ip', '').strip()
    if not ip:
        return jsonify({'error': 'Please enter an IP address', 'success': False})
    try:
        url = f"http://ip-api.com/json/{ip}?fields=status,message,country,regionName,city,zip,lat,lon,timezone,isp,org,as,query"
        with urllib.request.urlopen(url, timeout=5) as response:
            result = json.loads(response.read().decode())
        if result.get('status') == 'fail':
            return jsonify({'error': result.get('message', 'Lookup failed'), 'success': False})
        return jsonify({'data': result, 'success': True})
    except Exception as e:
        return jsonify({'error': str(e), 'success': False})

# ─────────────────────────────────────────────
#  API: CHATBOT
# ─────────────────────────────────────────────
@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message', '')
    history = data.get('history', [])

    system_prompt = (
        "You are CyberGuard AI, a concise cybersecurity assistant. "
        "You specialize in network security, cryptography, ethical hacking, "
        "OWASP Top 10, penetration testing, and cybersecurity best practices. "
        "Keep answers short and clear. Use bullet points when helpful. "
        "Never assist with illegal activities."
    )

    try:
        # Build message list in Ollama format
        messages = [{'role': 'system', 'content': system_prompt}]
        for msg in history[-6:]:   # keep last 6 turns to stay within context
            role = 'assistant' if msg['role'] == 'model' else msg['role']
            messages.append({'role': role, 'content': msg['content']})
        messages.append({'role': 'user', 'content': message})

        response = ollama.chat(
            model=OLLAMA_MODEL,
            messages=messages,
            options={'num_predict': 512}   # cap output length for speed
        )
        reply = response['message']['content']
        return jsonify({'response': reply})
    except Exception as e:
        return jsonify({'response': f'⚠️ Ollama error: {str(e)}. Make sure Ollama is running (`ollama serve`) and the model is pulled (`ollama pull {OLLAMA_MODEL}`).'}) 


if __name__ == '__main__':
    print("=" * 50)
    print("  CyberSec Toolkit - Starting Server")
    print("  Open: http://127.0.0.1:5000")
    print("=" * 50)
    app.run(debug=True, port=5000)
