/* ============================================================
   CyberGuard Toolkit — scripts.js
   ============================================================ */

const API = '';   // same-origin Flask server

/* ─── GLOSSARY DATA ─── */
const GLOSSARY = [
  { term: 'SQL Injection', def: 'An attack that inserts malicious SQL code into queries to manipulate databases and extract unauthorized data.' },
  { term: 'XSS (Cross-Site Scripting)', def: 'Injection of malicious scripts into web pages viewed by other users, stealing cookies or credentials.' },
  { term: 'Phishing', def: 'Social engineering attack tricking users into revealing sensitive information via fraudulent emails or websites.' },
  { term: 'Ransomware', def: 'Malware that encrypts a victim\'s files and demands payment for the decryption key.' },
  { term: 'Zero-Day Exploit', def: 'An attack targeting a software vulnerability that is unknown to the vendor with no available patch.' },
  { term: 'Man-in-the-Middle (MITM)', def: 'An attacker secretly intercepts and relays communication between two parties who believe they are communicating directly.' },
  { term: 'OWASP Top 10', def: 'A standard awareness document listing the 10 most critical web application security risks maintained by OWASP.' },
  { term: 'Penetration Testing', def: 'Authorized simulated cyberattack on a system to evaluate its security posture and find vulnerabilities.' },
  { term: 'Social Engineering', def: 'Psychological manipulation of people into performing actions or divulging confidential information.' },
  { term: 'Brute Force Attack', def: 'Trial-and-error method to decode encrypted data by systematically trying all possible combinations.' },
  { term: 'Firewall', def: 'A network security system that monitors and controls incoming and outgoing traffic based on predetermined rules.' },
  { term: 'VPN (Virtual Private Network)', def: 'Encrypts internet traffic and masks the user\'s IP address by routing through a secure server.' },
  { term: 'Two-Factor Authentication (2FA)', def: 'An extra layer of security requiring not only a password but also a second form of verification.' },
  { term: 'Cryptography', def: 'The practice of secure communication techniques that protect information by transforming it into unreadable formats.' },
  { term: 'DDoS Attack', def: 'Distributed Denial of Service — flooding a target with massive traffic from multiple sources to disrupt service.' },
  { term: 'Malware', def: 'Malicious software designed to disrupt, damage, or gain unauthorized access to computer systems.' },
  { term: 'Buffer Overflow', def: 'A vulnerability where a program writes more data to a buffer than it can hold, corrupting adjacent memory.' },
  { term: 'Privilege Escalation', def: 'Exploiting a bug or design flaw to gain elevated access to resources normally protected from an application or user.' },
  { term: 'Encryption', def: 'The process of converting plaintext into ciphertext using an algorithm and key to prevent unauthorized access.' },
  { term: 'Digital Forensics', def: 'The process of uncovering and interpreting electronic data for use in civil or criminal court cases.' },
  { term: 'Keylogger', def: 'Software or hardware that records keystrokes made by a user to steal passwords and sensitive information.' },
  { term: 'CVE (Common Vulnerabilities and Exposures)', def: 'A dictionary of publicly known cybersecurity vulnerabilities and exposures assigned unique identifiers.' },
  { term: 'SSL/TLS', def: 'Cryptographic protocols that provide secure communication over a computer network, commonly used for HTTPS.' },
  { term: 'Honeypot', def: 'A decoy system or network resource designed to lure attackers and study their tactics and tools.' },
];

/* ─── UTILITIES ─── */
function $(id) { return document.getElementById(id); }
function show(el) { el && el.classList.remove('hidden'); }
function hide(el) { el && el.classList.add('hidden'); }
function toggleClass(el, cls) { el && el.classList.toggle(cls); }

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {}).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  });
}

async function apiFetch(endpoint, body) {
  const res = await fetch(API + endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return res.json();
}

/* ─── PAGE ROUTING ─── */
const pages = document.querySelectorAll('.page');
const navItems = document.querySelectorAll('.nav-item');
const topbarTitle = $('topbarTitle');

const pageTitles = {
  dashboard: 'Dashboard', password: 'Password Checker', hasher: 'Hash Generator',
  dehasher: 'Hash Decoder', base64: 'Base64 Tool', caesar: 'Caesar Cipher',
  jwt: 'JWT Decoder', iplookup: 'IP Lookup', url: 'URL Encoder', glossary: 'Cyber Glossary'
};

function navigateTo(pageId) {
  pages.forEach(p => p.classList.remove('active'));
  navItems.forEach(n => n.classList.remove('active'));
  const targetPage = $('page-' + pageId);
  if (targetPage) { targetPage.classList.add('active'); }
  const targetNav = document.querySelector(`.nav-item[data-page="${pageId}"]`);
  if (targetNav) { targetNav.classList.add('active'); }
  topbarTitle.textContent = pageTitles[pageId] || 'CyberGuard';
  // Close sidebar on mobile
  if (window.innerWidth <= 900) { $('sidebar').classList.remove('open'); }
}

navItems.forEach(btn => {
  btn.addEventListener('click', () => navigateTo(btn.dataset.page));
});

// Handle any data-page buttons (hero, dashboard cards)
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-page]');
  if (btn && !btn.classList.contains('nav-item')) {
    navigateTo(btn.dataset.page);
  }
});

/* ─── SIDEBAR TOGGLE ─── */
$('menuToggle').addEventListener('click', () => {
  $('sidebar').classList.toggle('open');
});

/* ─── PASSWORD CHECKER ─── */
$('checkPwBtn').addEventListener('click', checkPassword);
$('pwInput').addEventListener('keydown', e => { if (e.key === 'Enter') checkPassword(); });
$('eyeBtn').addEventListener('click', () => {
  const inp = $('pwInput');
  inp.type = inp.type === 'password' ? 'text' : 'password';
});

async function checkPassword() {
  const password = $('pwInput').value;
  if (!password) return;
  try {
    const data = await apiFetch('/api/password-strength', { password });
    const result = $('pwResult');
    show(result);

    const pct = (data.score / data.max_score) * 100;
    const fill = document.querySelector('.strength-bar-fill');
    fill.style.width = pct + '%';
    fill.style.background = {
      'Very Weak': 'var(--red)', 'Weak': '#f97316',
      'Moderate': 'var(--yellow)', 'Strong': 'var(--green)', 'Very Strong': 'var(--accent)'
    }[data.strength] || 'var(--red)';

    const label = $('strengthLabel');
    label.textContent = data.strength;
    label.className = 'strength-label ' + data.strength.toLowerCase().replace(' ', '-');

    $('entropyLabel').textContent = `Entropy: ~${data.entropy} bits`;
    $('crackTime').textContent = data.time_to_crack;

    // Criteria
    const grid = $('criteriaGrid');
    grid.innerHTML = '';
    const criteriaMap = {
      length: '8+ characters', uppercase: 'Uppercase (A-Z)',
      lowercase: 'Lowercase (a-z)', digits: 'Numbers (0-9)', special: 'Special chars (!@#…)'
    };
    Object.entries(data.criteria).forEach(([k, v]) => {
      const div = document.createElement('div');
      div.className = 'criterion ' + (v ? 'pass' : 'fail');
      div.innerHTML = `<span>${v ? '✓' : '✗'}</span> ${criteriaMap[k]}`;
      grid.appendChild(div);
    });

    const fb = $('pwFeedback');
    fb.innerHTML = data.feedback.map(f => `<div class="pw-feedback-item">⚠ ${f}</div>`).join('');
  } catch (err) {
    console.error(err);
  }
}

/* ─── HASHER ─── */
$('hashBtn').addEventListener('click', async () => {
  const text = $('hashInput').value;
  if (!text) return;
  const checked = [...document.querySelectorAll('.algo-checks input:checked')].map(i => i.value);
  if (!checked.length) return;

  try {
    const data = await apiFetch('/api/hash', { text, algorithms: checked });
    const container = $('hashResults');
    show(container);
    container.innerHTML = Object.entries(data.results).map(([algo, hash]) => `
      <div class="hash-item">
        <div class="hash-algo">${algo.toUpperCase()}</div>
        <div class="hash-value" title="Click to copy" onclick="copyText('${hash}')">${hash}</div>
        <div class="hash-copy-hint">Click to copy</div>
      </div>`).join('');
  } catch (err) { console.error(err); }
});

/* ─── DEHASHER ─── */
$('dehashBtn').addEventListener('click', async () => {
  const hash = $('dehashInput').value.trim();
  if (!hash) return;
  try {
    const data = await apiFetch('/api/dehash', { hash });
    const panel = $('dehashResult');
    show(panel);
    panel.className = 'result-panel ' + (data.found ? 'found' : 'not-found');
    panel.innerHTML = data.found
      ? `🔓 <strong>Match Found:</strong> <code style="font-family:'JetBrains Mono',monospace">${data.result}</code>`
      : `🔒 ${data.result}`;
  } catch (err) { console.error(err); }
});

/* ─── BASE64 ─── */
async function doBase64(action) {
  const text = $('b64Input').value;
  if (!text) return;
  try {
    const data = await apiFetch('/api/base64', { text, action });
    $('b64Output').value = data.result;
  } catch (err) { $('b64Output').value = 'Error: ' + err.message; }
}
$('b64EncodeBtn').addEventListener('click', () => doBase64('encode'));
$('b64DecodeBtn').addEventListener('click', () => doBase64('decode'));
$('b64CopyBtn').addEventListener('click', () => copyText($('b64Output').value));

/* ─── CAESAR CIPHER ─── */
const shiftRange = $('shiftRange');
const shiftVal = $('shiftVal');
shiftRange.addEventListener('input', () => { shiftVal.textContent = shiftRange.value; });

async function doCaesar(action) {
  const text = $('caesarInput').value;
  if (!text) return;
  try {
    const data = await apiFetch('/api/caesar', { text, shift: parseInt(shiftRange.value), action });
    $('caesarOutput').value = data.result;
  } catch (err) { $('caesarOutput').value = 'Error: ' + err.message; }
}
$('caesarEncBtn').addEventListener('click', () => doCaesar('encrypt'));
$('caesarDecBtn').addEventListener('click', () => doCaesar('decrypt'));
$('caesarCopyBtn').addEventListener('click', () => copyText($('caesarOutput').value));

/* ─── JWT DECODER ─── */
$('jwtDecodeBtn').addEventListener('click', async () => {
  const token = $('jwtInput').value.trim();
  if (!token) return;
  hide($('jwtResult')); hide($('jwtError'));
  try {
    const data = await apiFetch('/api/jwt-decode', { token });
    if (!data.success) {
      const errEl = $('jwtError');
      show(errEl);
      errEl.textContent = '⚠ ' + data.error;
      return;
    }
    show($('jwtResult'));
    $('jwtHeader').textContent = JSON.stringify(data.header, null, 2);
    $('jwtPayload').textContent = JSON.stringify(data.payload, null, 2);
    $('jwtSig').textContent = data.signature;
  } catch (err) { console.error(err); }
});

/* ─── IP LOOKUP ─── */
$('ipLookupBtn').addEventListener('click', async () => {
  const ip = $('ipInput').value.trim();
  if (!ip) return;
  const result = $('ipResult');
  show(result);
  result.className = 'ip-result';
  result.innerHTML = '<p style="color:var(--text-muted);grid-column:1/-1">Looking up…</p>';
  try {
    const data = await apiFetch('/api/ip-lookup', { ip });
    if (!data.success) {
      result.innerHTML = `<p style="color:var(--red);grid-column:1/-1">⚠ ${data.error}</p>`;
      return;
    }
    const d = data.data;
    const fields = [
      ['IP Address', d.query], ['Country', d.country], ['Region', d.regionName],
      ['City', d.city], ['ZIP Code', d.zip], ['Timezone', d.timezone],
      ['ISP', d.isp], ['Organization', d.org], ['AS', d.as],
      ['Latitude', d.lat], ['Longitude', d.lon]
    ];
    result.innerHTML = fields.map(([label, val]) => `
      <div class="ip-field">
        <div class="ip-field-label">${label}</div>
        <div class="ip-field-value">${val || '—'}</div>
      </div>`).join('');
  } catch (err) {
    result.innerHTML = `<p style="color:var(--red);grid-column:1/-1">Error: ${err.message}</p>`;
  }
});

/* ─── URL ENCODER ─── */
async function doUrl(action) {
  const text = $('urlInput').value;
  if (!text) return;
  try {
    const data = await apiFetch('/api/url-encode', { text, action });
    $('urlOutput').value = data.result;
  } catch (err) { $('urlOutput').value = 'Error: ' + err.message; }
}
$('urlEncBtn').addEventListener('click', () => doUrl('encode'));
$('urlDecBtn').addEventListener('click', () => doUrl('decode'));
$('urlCopyBtn').addEventListener('click', () => copyText($('urlOutput').value));

/* ─── GLOSSARY ─── */
function renderGlossary(filter = '') {
  const grid = $('glossaryGrid');
  const q = filter.toLowerCase();
  const filtered = GLOSSARY.filter(g => g.term.toLowerCase().includes(q) || g.def.toLowerCase().includes(q));
  grid.innerHTML = filtered.map(g => `
    <div class="glossary-card">
      <div class="glossary-term">${g.term}</div>
      <div class="glossary-def">${g.def}</div>
    </div>`).join('');
}
renderGlossary();
$('glossarySearch').addEventListener('input', e => renderGlossary(e.target.value));

/* ─── CHATBOT ─── */
const chatHistory = [];

function openChat() {
  $('chatPanel').classList.remove('hidden');
  $('chatPanel').classList.add('open');
  $('chatOverlay').classList.remove('hidden');
  $('chatInput').focus();
}

function closeChat() {
  $('chatPanel').classList.remove('open');
  setTimeout(() => {
    $('chatPanel').classList.add('hidden');
    $('chatOverlay').classList.add('hidden');
  }, 350);
}

$('chatOpenBtn').addEventListener('click', openChat);
$('chatCloseBtn').addEventListener('click', closeChat);
$('chatOverlay').addEventListener('click', closeChat);

// Quick prompt buttons
document.addEventListener('click', e => {
  const qb = e.target.closest('.quick-btn');
  if (qb) {
    openChat();
    sendMessage(qb.dataset.q);
  }
});

function appendMessage(text, role) {
  const msgs = $('chatMessages');
  const div = document.createElement('div');
  div.className = 'chat-msg ' + role;
  const avatarEmoji = role === 'ai' ? '🤖' : '👤';
  const avatarClass = role === 'user' ? 'msg-avatar user-avatar' : 'msg-avatar';
  div.innerHTML = `<div class="${avatarClass}">${avatarEmoji}</div><div class="msg-bubble">${formatMessage(text)}</div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}

function formatMessage(text) {
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code style="font-family:\'JetBrains Mono\',monospace;background:rgba(255,255,255,0.07);padding:1px 5px;border-radius:4px">$1</code>')
    .replace(/\n/g, '<br>');
}

function showTypingIndicator() {
  const msgs = $('chatMessages');
  const div = document.createElement('div');
  div.className = 'chat-msg ai';
  div.id = 'typingIndicator';
  div.innerHTML = `<div class="msg-avatar">🤖</div><div class="msg-bubble"><div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div></div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function removeTypingIndicator() {
  const ti = $('typingIndicator');
  if (ti) ti.remove();
}

async function sendMessage(text) {
  const msg = text || $('chatInput').value.trim();
  if (!msg) return;
  $('chatInput').value = '';
  $('chatInput').style.height = '';

  appendMessage(msg, 'user');
  chatHistory.push({ role: 'user', content: msg });
  showTypingIndicator();
  $('chatSendBtn').disabled = true;

  try {
    const data = await apiFetch('/api/chat', { message: msg, history: chatHistory });
    removeTypingIndicator();
    const reply = data.response || 'No response from AI.';
    appendMessage(reply, 'ai');
    chatHistory.push({ role: 'model', content: reply });
  } catch (err) {
    removeTypingIndicator();
    appendMessage('⚠ Connection error. Please make sure the server is running.', 'ai');
  } finally {
    $('chatSendBtn').disabled = false;
  }
}

$('chatSendBtn').addEventListener('click', () => sendMessage());
$('chatInput').addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
});

// Auto-resize chat textarea
$('chatInput').addEventListener('input', function() {
  this.style.height = '';
  this.style.height = Math.min(this.scrollHeight, 120) + 'px';
});
