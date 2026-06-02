<div align="center">

# ⚡ CyberGuard — Security Toolkit

**A comprehensive cybersecurity awareness and assistance platform powered by local AI**

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=for-the-badge&logo=flask&logoColor=white)
![Ollama](https://img.shields.io/badge/Ollama-Local_AI-3B82F6?style=for-the-badge&logo=ollama&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/yourusername/cyberguard/graphs/commit-activity)
[![GitHub stars](https://img.shields.io/github/stars/yourusername/cyberguard?style=social)](https://github.com/yourusername/cyberguard)

**CyberGuard** is an open-source cybersecurity awareness and assistance platform that helps users understand threats, learn best practices, identify common attack vectors, and receive AI-powered guidance — all running **100% locally** on your machine.

---

</div>

---

## 📋 Table of Contents

- [✨ Features](#features)
- [🛠️ Tech Stack](#tech-stack)
- [🏗️ System Architecture](#system-architecture)
- [📁 Project Structure](#project-structure)
- [🚀 Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Frontend Setup](#frontend-setup)
  - [Running the Application](#running-the-application)
- [⚙️ Environment Variables](#environment-variables)
- [📡 API Endpoints](#api-endpoints)
- [📸 Screenshots](#screenshots)
- [🧭 Future Enhancements](#future-enhancements)
- [⚠️ Security Disclaimer](#security-disclaimer)
- [🤝 Contributing](#contributing)
- [📄 License](#license)
- [👤 Author](#author)

---

## ✨ Features

### 🔐 Password Strength Analyzer
Analyze any password against real-world security standards. Get detailed feedback including entropy estimation, crack time simulation, and criteria-based scoring.

### #️⃣ Hash Generator & Decoder
Generate cryptographic hashes (MD5, SHA-1, SHA-256, SHA-512) for any text. Decode common hashes using a built-in rainbow table dictionary attack.

### 🔤 Base64 Encoder / Decoder
Quickly encode and decode Base64 strings — essential for inspecting encoded payloads, tokens, and data transfers.

### 🔐 Caesar Cipher Tool
Encrypt and decrypt messages using the classic ROT/shift cipher. Adjustable shift key with real-time preview.

### 🪙 JWT Decoder
Inspect and decode JSON Web Tokens to view header claims, payload data, and signatures. Perfect for debugging authentication flows.

### 🌐 IP Geolocation Lookup
Trace any IP address to its geographic location, including country, region, city, ISP, organization, and coordinates using the ip-api.com service.

### 🔗 URL Encoder / Decoder
Safely encode and decode URLs and query parameters for web security testing and analysis.

### 📖 Cyber Security Glossary
A comprehensive glossary of 24+ essential cybersecurity terms with search functionality — from SQL Injection to Zero-Day Exploits.

### 🤖 AI-Powered Chatbot
Ask cybersecurity questions and get expert guidance from an AI assistant powered by **Ollama** running locally on your machine. No data ever leaves your computer.

### 📊 Interactive Dashboard
A modern, dark-themed dashboard with quick access to all tools, real-time terminal animations, and a responsive layout that works on desktop and mobile.

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Python 3.10+** | Core programming language |
| **Flask 3.0** | Lightweight web framework for REST API |
| **Flask-CORS** | Cross-origin resource sharing |
| **Ollama** | Local LLM inference for AI chatbot |
| **python-dotenv** | Environment variable management |

### Frontend
| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic page structure |
| **CSS3** | Custom styling with CSS custom properties |
| **JavaScript (ES6+)** | Client-side interactivity and API consumption |
| **Inter / JetBrains Mono** | Typography — system UI & monospace fonts |

### Tools & Services
| Tool | Purpose |
|------|---------|
| **ip-api.com** | Free IP geolocation API |
| **Ollama** | Local LLM serving (smollm2:135m default) |

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────┐
│                     ┌──────────────┐                 │
│                     │   Browser    │                 │
│                     │  (Frontend)  │                 │
│                     └──────┬───────┘                 │
│                            │                         │
│                     HTTP POST /api/*                 │
│                            │                         │
│                     ┌──────▼───────┐                 │
│                     │    Flask     │                 │
│                     │    Server    │                 │
│                     │  (main.py)   │                 │
│                     └──┬───┬───┬───┘                 │
│                        │   │   │                     │
│              ┌─────────┘   │   └──────────┐          │
│              ▼             ▼              ▼          │
│     ┌─────────────┐ ┌──────────┐ ┌────────────┐     │
│     │  Security   │ │  Crypto  │ │   Ollama   │     │
│     │   Tools     │ │  Utils   │ │  Local AI  │     │
│     │ (Password,  │ │(Hash,    │ │ (Chatbot)  │     │
│     │  JWT, IP…)  │ │ Base64,  │ │            │     │
│     │             │ │ Caesar)  │ │            │     │
│     └─────────────┘ └──────────┘ └────────────┘     │
└──────────────────────────────────────────────────────┘
```

**Data Flow:**
1. User interacts with the single-page frontend via the dashboard
2. Frontend sends POST requests to Flask API endpoints
3. Flask processes requests using built-in Python libraries (hashlib, base64, etc.)
4. For AI chat, Flask communicates with the local Ollama instance
5. For IP lookup, Flask queries the ip-api.com public API
6. Responses are returned as JSON and rendered in the frontend

---

## 📁 Project Structure

```
cyberguard/
├── main.py              # Flask backend — all API endpoints
├── index.html           # Single-page application frontend
├── scripts.js           # Client-side interactivity & API calls
├── style.css            # Complete styling with CSS variables
├── requirements.txt     # Python dependencies
├── run_app.bat          # Windows one-click launcher
├── .env                 # Environment variables (user-created)
├── .gitignore           # Git ignore rules
└── README.md            # Project documentation (you are here)
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.10 or higher** — [Download Python](https://www.python.org/downloads/)
- **Ollama** (for AI chatbot feature) — [Download Ollama](https://ollama.com/download/)
- **Git** (optional) — [Download Git](https://git-scm.com/downloads/)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/cyberguard.git
cd cyberguard
```

#### 2. Set Up Virtual Environment

It's recommended to use a virtual environment to isolate dependencies.

**Windows:**
```bash
python -m venv .venv
.venv\Scripts\activate
```

**macOS / Linux:**
```bash
python3 -m venv .venv
source .venv/bin/activate
```

#### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

This installs:
| Package | Version | Purpose |
|---------|---------|---------|
| `flask` | Latest | Web framework |
| `flask-cors` | Latest | Cross-origin support |
| `ollama` | Latest | Python client for local LLM |
| `python-dotenv` | Latest | .env file loader |

#### 4. Configure Environment

Create a `.env` file in the project root:

```bash
touch .env   # or manually create the file
```

See the [Environment Variables](#%EF%B8%8F-environment-variables) section for configuration options.

#### 5. (Optional) Pull an Ollama Model

For the AI chatbot feature, you need a local LLM model:

```bash
# Pull the default lightweight model (~75MB)
ollama pull smollm2:135m

# Or use a more capable model (recommended for better responses)
ollama pull llama3.2:1b   # ~800MB
ollama pull mistral:7b    # ~4.1GB — best quality, requires more RAM
```

> **Note:** The chatbot shows a helpful error message if Ollama is not running. All other tools work without Ollama.

---

### Frontend Setup

Since the CyberGuard frontend is a single-page application built with **vanilla HTML, CSS, and JavaScript**, no separate build tools or package managers are required.

The frontend is served directly by the Flask backend at the root URL (`/`). All static files (`index.html`, `style.css`, `scripts.js`) are automatically hosted by Flask.

> **No npm, webpack, Vite, or React setup needed** — just start the Flask server and open your browser.

---

### Running the Application

#### Option A: One-Click Launcher (Windows)

Simply double-click `run_app.bat` — it automatically:
1. Creates a virtual environment (if missing)
2. Activates it
3. Installs/updates dependencies
4. Starts the Flask server

#### Option B: Manual Start

```bash
# Activate virtual environment (if not already active)
.venv\Scripts\activate      # Windows
source .venv/bin/activate    # macOS / Linux

# Start the server
python main.py
```

#### Option C: Custom Port

In `main.py`, change the last line:
```python
app.run(debug=True, port=8080)
```

#### Access the Application

Open your browser and navigate to:

```
http://127.0.0.1:5000
```

### Running Ollama (for AI Chat)

Make sure Ollama is running in the background before using the chatbot:

```bash
# Start the Ollama service
ollama serve
```

Verify it's running:
```bash
curl http://localhost:11434/api/tags
```

> **Expected response:** A JSON list of downloaded models.

---

## ⚙️ Environment Variables

Create a `.env` file in the project root with the following optional configuration:

```env
# Ollama Configuration
# Model to use for the AI chatbot
OLLAMA_MODEL=smollm2:135m

# Ollama server address (change if running remotely)
OLLAMA_HOST=http://localhost:11434
```

| Variable | Default | Description |
|----------|---------|-------------|
| `OLLAMA_MODEL` | `smollm2:135m` | LLM model for AI chat. Change to any model you've pulled |
| `OLLAMA_HOST` | `http://localhost:11434` | Ollama server URL. Useful if running Ollama on a different machine |

> **Tip:** If no `.env` file exists, CyberGuard uses sensible defaults and everything runs out of the box.

---

## 📡 API Endpoints

All endpoints accept `POST` requests with `Content-Type: application/json`.

### 🔐 Password Strength

```
POST /api/password-strength
```

**Request:**
```json
{
  "password": "MyP@ssw0rd!"
}
```

**Response:**
```json
{
  "score": 5,
  "max_score": 6,
  "strength": "Very Strong",
  "feedback": [],
  "criteria": {
    "length": true,
    "uppercase": true,
    "lowercase": true,
    "digits": true,
    "special": true
  },
  "entropy": 65.5,
  "time_to_crack": "Centuries"
}
```

### #️⃣ Hash Generator

```
POST /api/hash
```

**Request:**
```json
{
  "text": "hello",
  "algorithms": ["md5", "sha1", "sha256", "sha512"]
}
```

**Response:**
```json
{
  "results": {
    "md5": "5d41402abc4b2a76b9719d911017c592",
    "sha1": "aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d",
    "sha256": "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
    "sha512": "9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043"
  }
}
```

### 🔓 Hash Decoder

```
POST /api/dehash
```

**Request:**
```json
{
  "hash": "5d41402abc4b2a76b9719d911017c592"
}
```

**Response (found):**
```json
{
  "result": "hello",
  "found": true
}
```

**Response (not found):**
```json
{
  "result": "Not found in dictionary. Hashes are one-way — this is cryptographically secure!",
  "found": false
}
```

### 🔤 Base64 Tool

```
POST /api/base64
```

**Request:**
```json
{
  "text": "Hello, World!",
  "action": "encode"
}
```

**Response:**
```json
{
  "result": "SGVsbG8sIFdvcmxkIQ==",
  "success": true
}
```

### 🔗 URL Encoder / Decoder

```
POST /api/url-encode
```

**Request:**
```json
{
  "text": "hello world & foo=bar",
  "action": "encode"
}
```

**Response:**
```json
{
  "result": "hello%20world%20%26%20foo%3Dbar",
  "success": true
}
```

### 🔐 Caesar Cipher

```
POST /api/caesar
```

**Request:**
```json
{
  "text": "Hello, World!",
  "shift": 3,
  "action": "encrypt"
}
```

**Response:**
```json
{
  "result": "Khoor, Zruog!",
  "success": true
}
```

### 🪙 JWT Decoder

```
POST /api/jwt-decode
```

**Request:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkN5YmVyR3VhcmQiLCJpYXQiOjE1MTYyMzkwMjJ9.example_signature"
}
```

**Response:**
```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "1234567890",
    "name": "CyberGuard",
    "iat": 1516239022
  },
  "signature": "example_signature",
  "success": true
}
```

### 🌐 IP Geolocation

```
POST /api/ip-lookup
```

**Request:**
```json
{
  "ip": "8.8.8.8"
}
```

**Response:**
```json
{
  "data": {
    "query": "8.8.8.8",
    "country": "United States",
    "regionName": "California",
    "city": "Mountain View",
    "zip": "94043",
    "lat": 37.4056,
    "lon": -122.0775,
    "timezone": "America/Los_Angeles",
    "isp": "Google LLC",
    "org": "Google LLC",
    "as": "AS15169 Google LLC"
  },
  "success": true
}
```

### 🤖 AI Chatbot

```
POST /api/chat
```

**Request:**
```json
{
  "message": "What is SQL injection?",
  "history": []
}
```

**Response:**
```json
{
  "response": "**SQL Injection** is a code injection technique where an attacker inserts malicious SQL statements into an application's query fields...\n\n**Prevention:**\n- Use parameterized queries / prepared statements\n- Implement input validation and sanitization\n- Apply least privilege principle to database accounts\n- Use ORM frameworks with built-in protection"
}
```

---

## 📸 Screenshots

### 🏠 Dashboard
![Dashboard](https://via.placeholder.com/800x450/111827/3b82f6?text=CyberGuard+Dashboard+with+Tool+Cards)
*The main dashboard with quick access to all security tools and hero banner.*

### 🔐 Password Strength Checker
![Password Checker](https://via.placeholder.com/800x350/111827/10b981?text=Password+Strength+Analyzer)
*Real-time password analysis with entropy, crack time, and criteria feedback.*

### #️⃣ Hash Generator
![Hash Generator](https://via.placeholder.com/800x300/111827/0ea5e9?text=Hash+Generator+Tool)
*Generate multiple hash types simultaneously from any text input.*

### 🌐 IP Lookup
![IP Lookup](https://via.placeholder.com/800x400/111827/ef4444?text=IP+Geolocation+Lookup)
*Geolocate IP addresses with ISP and organization details.*

### 🤖 AI Chatbot
![Chatbot](https://via.placeholder.com/400x600/111827/8b5cf6?text=CyberGuard+AI+Chatbot)
*AI-powered cybersecurity assistant with quick prompt buttons.*

### 📖 Cyber Glossary
![Glossary](https://via.placeholder.com/800x400/111827/f59e0b?text=Cyber+Security+Glossary)
*Searchable glossary of 24+ essential cybersecurity terms.*

---

## 🧭 Future Enhancements

### Short Term
- [x] ~~Password strength analyzer~~ ✅ *Completed*
- [x] ~~Hash generator & decoder~~ ✅ *Completed*
- [x] ~~JWT decoder~~ ✅ *Completed*
- [ ] **Two-Factor Authentication (2FA)** — TOTP-based 2FA verification tool
- [ ] **Password Generator** — Configurable strong password generator with rules
- [ ] **Text Encryption** — AES-256 encryption/decryption for text messages

### Medium Term
- [ ] **User Authentication** — JWT-based login system with persistent sessions
- [ ] **History & Reports** — Save scan history and generate PDF security reports
- [ ] **Vulnerability Database** — Searchable CVE database integration
- [ ] **Responsive Dark/Light Theme** — Theme toggle with persisted preferences
- [ ] **Hash Identifier** — Detect hash type from format/length

### Long Term
- [ ] **PostgreSQL Database** — Persistent storage for users, scan history, and settings
- [ ] **FastAPI Migration** — Transition from Flask to FastAPI for better async support and auto-generated OpenAPI docs
- [ ] **React + TypeScript Frontend** — Modern SPA with component-driven architecture
- [ ] **Docker Containerization** — Docker Compose setup for one-command deployment
- [ ] **Real-time Threat Feed** — Live dashboard with global threat intelligence data
- [ ] **Progressive Web App (PWA)** — Offline support and installable app

---

## ⚠️ Security Disclaimer

> **IMPORTANT: Read Before Using**

CyberGuard is an **educational tool** designed for cybersecurity learning, awareness, and ethical security assessment. By using this software, you agree to the following:

1. **Educational Purpose Only** — This tool is intended for learning about cybersecurity concepts, testing your own systems, and educational demonstrations.

2. **No Illegal Use** — Do not use CyberGuard to attack, scan, or gain unauthorized access to systems you do not own or have explicit written permission to test.

3. **Local Processing** — The AI chatbot runs entirely on your local machine via Ollama. No data is sent to external servers. However, the **IP Lookup** tool sends IP addresses to a third-party API (ip-api.com) for geolocation.

4. **No Warranty** — This software is provided "as is" without any warranty. The authors are not responsible for any misuse or damages.

5. **Password Privacy** — Password analysis is performed entirely on your local machine. Passwords are never sent to external servers.

6. **Ethical Use** — Always obtain proper authorization before testing the security of any system. Unauthorized access is illegal in most jurisdictions.

---

## 🤝 Contributing

Contributions are **welcome and appreciated**! Here's how you can help make CyberGuard better:

### Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork:
   ```bash
   git clone https://github.com/your-username/cyberguard.git
   cd cyberguard
   ```
3. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Make your changes** and test them
5. **Commit** your changes:
   ```bash
   git commit -m "feat: add amazing new feature"
   ```
6. **Push** to your fork:
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request** on the main repository

### Guidelines

- **Do** test your changes thoroughly before submitting
- **Do** follow the existing code style and patterns
- **Do** write clear commit messages using [Conventional Commits](https://www.conventionalcommits.org/)
- **Do** update documentation when adding or changing features
- **Don't** introduce breaking changes without discussion
- **Don't** submit code you didn't write or aren't licensed to distribute
- **Don't** add external dependencies without good reason

### Development Setup

```bash
# Clone and enter the project
git clone https://github.com/your-username/cyberguard.git
cd cyberguard

# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# Install dev dependencies
pip install -r requirements.txt

# Run the server
python main.py
```

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 CyberGuard

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👤 Author

**CyberGuard** is developed and maintained by passionate security and open-source enthusiasts.

<div align="center">

| | |
|---|---|
| **GitHub** | [@yourusername](https://github.com/yourusername) |
| **Twitter / X** | [@yourhandle](https://twitter.com/yourhandle) |
| **Email** | your.email@example.com |
| **Website** | [yourwebsite.com](https://yourwebsite.com) |

---

**Made with ⚡ and dedication to making the digital world a safer place.**

**If you find this project useful, please consider giving it a star on GitHub!**

*Stay safe. Stay secure.*

</div>
