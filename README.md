# Gemma Pocket Assistant 🚀

> An on-device AI utility assistant powered by **Gemma + LiteRT-LM** using Google's AI Edge Gallery framework.

[![Google AI Edge](https://img.shields.io/badge/Google%20AI%20Edge-Gallery-4285F4?style=flat-square&logo=google)](https://github.com/google-ai-edge/gallery)
[![Gemma](https://img.shields.io/badge/Powered%20by-Gemma-orange?style=flat-square)](https://ai.google.dev/gemma)
[![LiteRT-LM](https://img.shields.io/badge/Runtime-LiteRT--LM-green?style=flat-square)](https://ai.google.dev/edge/litert)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue?style=flat-square)](LICENSE)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔎 **Wikipedia Summarization** | Ask anything — Gemma queries Wikipedia and summarizes the result locally |
| 📱 **QR Code Generation** | Generate scannable QR codes for any URL or text instantly |
| ⚡ **Offline-first AI** | Core reasoning runs entirely on-device via LiteRT-LM |
| 🔒 **Privacy-focused** | No cloud calls for inference — your data stays on your device |
| 🌐 **Multilingual** | Supports English, Hindi, Kannada, Spanish, French, Japanese & more |

---

## 🛠 Tech Stack

- **[Gemma](https://ai.google.dev/gemma)** — Google's lightweight open model
- **[LiteRT-LM](https://ai.google.dev/edge/litert)** — On-device LLM runtime
- **[AI Edge Gallery](https://github.com/google-ai-edge/gallery)** — Android skill framework
- **JavaScript / HTML** — Skill execution via WebView
- **Wikipedia REST API** — Zero-auth real-time knowledge
- **qrcodejs** — Client-side QR generation

---

## 📂 Project Structure

```
gemma-pocket-assistant/
├── README.md
├── index.html                          ← GitHub Pages landing page
└── skills/built-in/gemma-pocket-assistant/
    ├── SKILL.md                        ← LLM trigger + routing instructions
    └── scripts/
        ├── wikipedia.html              ← Wikipedia fuzzy search + infobox parser
        └── qrcode.html                 ← QR generation via qrcodejs CDN
```

---

## 🚀 How to Use in AI Edge Gallery

### Option 1 — Load from URL (Recommended)

1. Open **AI Edge Gallery** app → select a Gemma model → enter **Agent Skills**
2. Tap **"Skills"** chip → **(+)** → **"Load skill from URL"**
3. Enter:
   ```
   https://saikirantechy.github.io/gemma-pocket-assistant/skills/built-in/gemma-pocket-assistant
   ```
4. Confirm — the skill is now active ✅

### Option 2 — ADB Push (Offline)

```bash
adb push skills/built-in/gemma-pocket-assistant /sdcard/Download/gemma-pocket-assistant
```
Then in the app: **Skills → (+) → Import local skill**

---

## 🎤 Demo Prompts

### Wikipedia Search
```
Who is Sundar Pichai?
Tell me about Bengaluru
What is LiteRT-LM?
Explain quantum computing
```

### QR Code Generation
```
Generate a QR code for sktnexus.com
Create a QR for https://github.com/saikirantechy
Make a QR code for my LinkedIn
```

---

## 🏗 How It Works

```
User Prompt
    │
    ▼
Gemma (on-device via LiteRT-LM)
    │  reads SKILL.md, detects intent
    ▼
run_js tool called
    │
    ├─► wikipedia.html ──► Wikipedia API ──► Infobox + Summary ──► Gemma summarizes
    │
    └─► qrcode.html   ──► qrcodejs CDN ──► Canvas → Base64 PNG ──► Rendered in chat
```

All **inference** happens on-device. Only the Wikipedia fetch and QR CDN library require internet.

---

## 📱 Built For

**Google AI Edge Gallery — Community Hackathon**

---

## 👨‍💻 Author

**Sai Kiran BK**

- 🌐 GitHub: [@saikirantechy](https://github.com/saikirantechy)
- 💼 LinkedIn: [linkedin.com/in/saikiranbk](https://linkedin.com/in/saikiranbk)

---

## ⭐ Support

If you found this useful, please give it a **star ⭐** — it helps others discover the project!

---

## 📄 License

Apache License 2.0 — see [LICENSE](LICENSE)
