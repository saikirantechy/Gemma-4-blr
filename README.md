# Gemma Pocket Assistant 🚀

> An on-device AI utility assistant powered by **Gemma + LiteRT-LM** using Google's AI Edge Gallery framework.

[![Google AI Edge](https://img.shields.io/badge/Google%20AI%20Edge-Gallery-4285F4?style=flat-square&logo=google)](https://github.com/google-ai-edge/gallery)
[![Gemma](https://img.shields.io/badge/Powered%20by-Gemma-orange?style=flat-square)](https://ai.google.dev/gemma)
[![LiteRT-LM](https://img.shields.io/badge/Runtime-LiteRT--LM-green?style=flat-square)](https://ai.google.dev/edge/litert)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue?style=flat-square)](LICENSE)

<p align="center">
  <img src="https://img.shields.io/github/stars/saikirantechy/Gemma-4-blr?style=for-the-badge&color=yellow" />
  <img src="https://img.shields.io/github/forks/saikirantechy/Gemma-4-blr?style=for-the-badge" />
  <img src="https://img.shields.io/github/issues/saikirantechy/Gemma-4-blr?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Contributions-Welcome-brightgreen?style=for-the-badge" />
</p>

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

```bash
Gemma-4-blr/
├── README.md
├── index.html
└── skills/
    └── built-in/
        └── gemma-pocket-assistant/
            ├── SKILL.md
            └── scripts/
                ├── wikipedia.html
                └── qrcode.html
```

---

## 🚀 How to Use in AI Edge Gallery

### Option 1 — Load from URL (Recommended)

1. Open **AI Edge Gallery** app
2. Select a Gemma model
3. Enter **Agent Skills**
4. Tap **"Skills"** chip → **(+)** → **"Load skill from URL"**
5. Enter:

```text
https://saikirantechy.github.io/Gemma-4-blr/skills/built-in/gemma-pocket-assistant
```

6. Confirm — the skill is now active ✅

---

### Option 2 — ADB Push (Offline)

```bash
adb push skills/built-in/gemma-pocket-assistant /sdcard/Download/gemma-pocket-assistant
```

Then inside the app:

```text
Skills → (+) → Import local skill
```

---

## 🎤 Demo Prompts

### Wikipedia Search

```text
Who is Sundar Pichai?
Tell me about Bengaluru
What is LiteRT-LM?
Explain quantum computing
```

### QR Code Generation

```text
Generate a QR code for sktnexus.com
Create a QR for https://github.com/saikirantechy
Make a QR code for my LinkedIn
```

---

## 🏗 How It Works

```text
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
    └─► qrcode.html ──► qrcodejs CDN ──► Canvas → Base64 PNG ──► Rendered in chat
```

All **inference** happens on-device.

Only:
- Wikipedia fetch
- QR CDN library

require internet access.

---

## 📱 Built For

**Google AI Edge Gallery — Community Hackathon**

---

## ⭐ Support This Project

If you find this helpful:

- ⭐ Give it a star
- 🚀 Share with your friends
- 🤝 Contribute to the project

---

## 🌐 Share This Project

<p align="center">

  <a href="https://www.reddit.com/submit?url=https://github.com/saikirantechy/Gemma-4-blr&title=Check%20out%20this%20Gemma%20Pocket%20Assistant%20🚀">
    <img src="https://img.shields.io/badge/share%20on-reddit-orange?style=for-the-badge&logo=reddit" />
  </a>

  <a href="https://news.ycombinator.com/submitlink?u=https://github.com/saikirantechy/Gemma-4-blr&t=Gemma%20Pocket%20Assistant">
    <img src="https://img.shields.io/badge/share%20on-hacker%20news-black?style=for-the-badge&logo=ycombinator" />
  </a>

  <a href="https://twitter.com/intent/tweet?url=https://github.com/saikirantechy/Gemma-4-blr&text=Check%20out%20this%20Gemma%20Pocket%20Assistant%20🚀">
    <img src="https://img.shields.io/badge/share%20on-twitter-blue?style=for-the-badge&logo=twitter" />
  </a>

  <a href="https://www.facebook.com/sharer/sharer.php?u=https://github.com/saikirantechy/Gemma-4-blr">
    <img src="https://img.shields.io/badge/share%20on-facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white" />
  </a>

  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://github.com/saikirantechy/Gemma-4-blr">
    <img src="https://img.shields.io/badge/share%20on-linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>

</p>

🚀 Help this project reach more developers by sharing it!

---

## ❤️ Contributors

Thanks to all the amazing open-source people contributing to this project!

<a href="https://github.com/saikirantechy/Gemma-4-blr/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=saikirantechy/Gemma-4-blr" />
</a>

---

## 👨‍💻 Author

### Sai Kiran BK

- 🌐 GitHub: [@saikirantechy](https://github.com/saikirantechy)
- 💼 LinkedIn: [linkedin.com/in/saikirantech](https://linkedin.com/in/saikirantech)

---

## ⭐ Support

If you found this useful, please give it a **star ⭐** — it helps others discover the project!

---

## 📄 License

Apache License 2.0 — see [LICENSE](LICENSE)
