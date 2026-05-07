# Contributing to Gemma AI Edge Skill Collection

Thank you for your interest in contributing! This project is an open-source ecosystem of lightweight, on-device AI skills powered by **Gemma + LiteRT-LM** and the [Google AI Edge Gallery](https://github.com/google-ai-edge/gallery) framework.

---

## 🚀 Quick Start

1. **Fork** this repository
2. **Clone** your fork locally
3. **Create a branch**: `git checkout -b skill/your-skill-name`
4. **Build** your skill following the guide below
5. **Test** it in the AI Edge Gallery app
6. **Submit** a Pull Request

---

## 📁 Skill Structure

Every skill lives in `skills/built-in/your-skill-name/` and follows this structure:

```
skills/built-in/your-skill-name/
├── SKILL.md          ← Required. LLM trigger + instructions.
└── scripts/          ← Required only for JS skills.
    └── index.html    ← Main entry point for JS execution.
```

Use the template in [`skill-template/`](./skill-template/) as your starting point.

---

## 🏗 Skill Types

| Type | When to Use | Files Needed |
|---|---|---|
| **Text-Only** | Gemma can handle it with good prompting (translation, explanation, analysis) | `SKILL.md` only |
| **JS Skill** | Needs external API calls, image generation, or interactive UI | `SKILL.md` + `scripts/index.html` |
| **Native** | Requires Android system capabilities (send email, SMS) | `SKILL.md` with `run_intent` instructions |

---

## 📝 Building a Text-Only Skill

Copy `skill-template/SKILL.md` and:
1. Set `name` (kebab-case, e.g. `my-skill-name`)
2. Set `description` (one sentence — this is what the LLM uses to decide when to trigger the skill)
3. Write clear, specific instructions for Gemma — treat it as a system prompt
4. Define trigger phrases, response format, and constraints

**SKILL.md frontmatter reference:**
```yaml
---
name: your-skill-name           # kebab-case, matches folder name
description: One clear sentence # LLM reads this to decide when to use the skill
metadata:
  homepage: https://...         # Optional: link shown in Skill Manager UI
  require-secret: true          # Optional: prompts user for API key
  require-secret-description: Go to [service] to get your key.
---
```

---

## 🛠 Building a JS Skill

Copy both files from `skill-template/` and:

1. **SKILL.md**: Instruct Gemma to call `run_js` with specific JSON parameters
2. **scripts/index.html**: Implement `window['ai_edge_gallery_get_result']`

**The JS function contract:**
```javascript
window['ai_edge_gallery_get_result'] = async (data, secret) => {
    const params = JSON.parse(data); // Parameters from LLM
    // Your logic here...
    return JSON.stringify({
        result: 'text shown to LLM',       // Required on success
        image: { base64: '...' },           // Optional: renders image in chat
        webview: { url: 'view.html' },      // Optional: renders inline webview
        error: 'message if something fails' // Use instead of result on failure
    });
};
```

**Key rules:**
- The function MUST be named exactly `ai_edge_gallery_get_result`
- Always return a stringified JSON object
- Use `error` field (not `result`) when something fails
- Cap external data at ~4000 chars to protect model context

---

## ✅ Quality Checklist

Before submitting a PR, verify:

- [ ] Skill folder is in `skills/built-in/` with kebab-case name
- [ ] `SKILL.md` has valid YAML frontmatter with `name` and `description`
- [ ] Skill works in AI Edge Gallery app (test via URL or ADB push)
- [ ] JS skills return proper JSON with `result` or `error` field
- [ ] No hardcoded API keys or secrets in code
- [ ] Skill is mobile-friendly (concise responses, no walls of text)
- [ ] Added your skill to the table in `README.md`

---

## 📱 Testing Your Skill

### Option A — Local HTTP Server
```bash
# From repo root
python -m http.server 8080
# Then load URL in app: http://YOUR_IP:8080/skills/built-in/your-skill-name
```

### Option B — ADB Push
```bash
adb push skills/built-in/your-skill-name /sdcard/Download/your-skill-name
# Then import from local file in the app
```

### Option C — GitHub Pages (after merging)
```
https://saikirantechy.github.io/Gemma-4-blr/skills/built-in/your-skill-name
```

---

## 🎨 Design Guidelines

- **Concise responses**: This runs on mobile — avoid walls of text
- **Structured output**: Use headers, bullet points, and tables
- **Offline-first**: Prefer zero-dependency solutions; external calls should be optional
- **Privacy**: Never log or transmit user data; note in SKILL.md that data stays on-device
- **Multilingual**: Consider Hindi/Kannada support for Indic language users

---

## 🙋 Need Help?

- Open a [GitHub Issue](https://github.com/saikirantechy/Gemma-4-blr/issues) for bugs or questions
- Reference the [AI Edge Gallery Skills README](https://github.com/google-ai-edge/gallery/blob/main/skills/README.md) for the full spec
- Tag your PR with the appropriate label: `text-skill`, `js-skill`, `enhancement`, or `bugfix`

---

## 📄 License

By contributing, you agree your code will be licensed under the [Apache License 2.0](LICENSE).
