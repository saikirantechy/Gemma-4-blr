// Shared JavaScript utilities for AI Edge Gallery Skills

// DOM utilities
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Local storage helpers
const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.warn("Error reading from localStorage:", e);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn("Error writing to localStorage:", e);
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn("Error removing from localStorage:", e);
    }
  },
};

// API helpers
const api = {
  fetch: async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API fetch error:", error);
      throw error;
    }
  },

  get: (url, options = {}) => api.fetch(url, { ...options, method: "GET" }),
  post: (url, data, options = {}) =>
    api.fetch(url, { ...options, method: "POST", body: JSON.stringify(data) }),
};

// Toast notifications
const toast = {
  show: (message, type = "info", duration = 3000) => {
    const toastEl = document.createElement("div");
    toastEl.className = `toast ${type}`;
    toastEl.textContent = message;

    document.body.appendChild(toastEl);

    setTimeout(() => {
      toastEl.remove();
    }, duration);
  },

  success: (message, duration) => toast.show(message, "success", duration),
  error: (message, duration) => toast.show(message, "error", duration),
};

// Loading states
const loading = {
  show: (element) => {
    if (typeof element === "string") element = $(element);
    if (element) {
      element.innerHTML = '<div class="spinner"></div>';
      element.disabled = true;
    }
  },

  hide: (element, originalContent = "") => {
    if (typeof element === "string") element = $(element);
    if (element) {
      element.innerHTML = originalContent;
      element.disabled = false;
    }
  },
};

// Copy to clipboard
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
    return true;
  } catch (error) {
    console.error("Failed to copy:", error);
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      toast.success("Copied to clipboard!");
      return true;
    } catch (fallbackError) {
      toast.error("Failed to copy to clipboard");
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  }
};

// Debounce function
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Format helpers
const format = {
  bytes: (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  },

  date: (date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  },
};

// Event delegation helper
const on = (eventType, selector, handler) => {
  document.addEventListener(eventType, (event) => {
    if (event.target.matches(selector)) {
      handler(event);
    }
  });
};

// Mobile detection
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
};

// Document generation helpers
const docUtils = {
  escape: (value) => {
    if (!value) return "";
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  },

  formatList: (items) => {
    if (!Array.isArray(items) || items.length === 0)
      return "<li>Not provided.</li>";
    return items.map((item) => `<li>${docUtils.escape(item)}</li>`).join("");
  },

  buildShareText: (skill) => {
    const title = skill.name || "Gemma AI Skill";
    return `Check out ${title} on Gemma AI Edge Gallery: ${skill.installUrl}`;
  },

  buildShareUrl: (platform, skill) => {
    const text = encodeURIComponent(docUtils.buildShareText(skill));
    const url = encodeURIComponent(skill.installUrl || "");
    switch (platform) {
      case "twitter":
        return `https://twitter.com/intent/tweet?text=${text}`;
      case "linkedin":
        return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      case "whatsapp":
        return `https://api.whatsapp.com/send?text=${text}`;
      case "telegram":
        return `https://t.me/share/url?url=${url}&text=${text}`;
      default:
        return skill.installUrl;
    }
  },

  buildQrUrl: (skill) => {
    const url = encodeURIComponent(skill.installUrl || "");
    return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${url}`;
  },

  getSkillMeta: async (
    skillName,
    metadataUrl = "https://saikirantechy.github.io/Gemma-4-blr/gallery/skills/metadata.json",
  ) => {
    try {
      const response = await fetch(metadataUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const skills = Array.isArray(data.skills) ? data.skills : [];
      return (
        skills.find((skill) => skill.id === skillName) ||
        skills.find((skill) => skill.path === skillName) ||
        skills.find((skill) =>
          String(skill.name || "")
            .toLowerCase()
            .includes(skillName.replace(/[-_]/g, " ").toLowerCase()),
        )
      );
    } catch (error) {
      console.warn("docUtils.getSkillMeta error:", error);
      return null;
    }
  },

  generateHtml: (skill, ecosystemName = "Gemma AI Edge Skills") => {
    const features = docUtils.formatList(skill.features);
    const examples = docUtils.formatList(skill.examplePrompts);
    const tech = docUtils.formatList(skill.techStack);
    const tags = Array.isArray(skill.tags)
      ? skill.tags.map((tag) => docUtils.escape(tag)).join(", ")
      : "";
    const installUrl = docUtils.escape(skill.installUrl || "N/A");
    const viewUrl = docUtils.escape(skill.viewUrl || "N/A");
    const usage = docUtils.escape(
      skill.usage ||
        "Use the skill with Gemma AI Edge Gallery by loading the install URL.",
    );
    const installInstructions = docUtils.escape(
      skill.installInstructions ||
        "Load the skill in AI Edge Gallery using the install URL, or host locally and open the skill folder from the app.",
    );
    const category = docUtils.escape(skill.category || "Unknown");
    const type = docUtils.escape(skill.type || "Unknown");

    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${docUtils.escape(skill.name)} Documentation</title>
    <style>
      body { font-family: Calibri, Arial, sans-serif; color: #111; background: #fff; margin: 32px; }
      h1 { color: #1e3a8a; }
      h2 { color: #0f172a; }
      p, li { font-size: 14px; line-height: 1.6; }
      ul { margin: 0 0 1rem 1.25rem; }
      .brand { color: #2563eb; font-weight: 700; }
      .meta { margin-top: 0.4rem; color: #475569; }
      .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #e2e8f0; color: #475569; }
      .tag-list { font-style: italic; color: #475569; }
      .block { margin-bottom: 1.5rem; }
      .meta-block { margin: 0.5rem 0 0.75rem; color: #334155; }
      .metadata-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-top: 0.5rem; }
      .metadata-grid div { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px; }
      .metadata-grid span { display: block; font-size: 12px; color: #64748b; }
      .metadata-grid strong { display: block; margin-top: 4px; color: #0f172a; }
      a { color: #2563eb; text-decoration: none; }
      a:hover { text-decoration: underline; }
    </style>
  </head>
  <body>
    <h1>${docUtils.escape(skill.name)}</h1>
    <p class="meta">${docUtils.escape(skill.description)}</p>
    <div class="metadata-grid">
      <div><span>Category</span><strong>${category}</strong></div>
      <div><span>Type</span><strong>${type}</strong></div>
      <div><span>Tags</span><strong>${docUtils.escape(tags)}</strong></div>
      <div><span>View URL</span><strong><a href="${viewUrl}">${viewUrl}</a></strong></div>
      <div><span>Install URL</span><strong><a href="${installUrl}">${installUrl}</a></strong></div>
    </div>
    <div class="block">
      <h2>Skill Overview</h2>
      <p>${docUtils.escape(skill.description)}</p>
    </div>
    <div class="block">
      <h2>Install Instructions</h2>
      <p>${installInstructions}</p>
    </div>
    <div class="block">
      <h2>Usage Guide</h2>
      <p>${usage}</p>
    </div>
    <div class="block">
      <h2>Features</h2>
      <ul>${features}</ul>
    </div>
    <div class="block">
      <h2>Example Prompts</h2>
      <ul>${examples}</ul>
    </div>
    <div class="block">
      <h2>Tech Stack</h2>
      <ul>${tech}</ul>
    </div>
    <div class="footer">
      <p>Generated from <span class="brand">${docUtils.escape(ecosystemName)}</span></p>
      <p>Repository: <a href="https://github.com/saikirantechy/Gemma-4-blr">https://github.com/saikirantechy/Gemma-4-blr</a></p>
      <p>GitHub Pages: <a href="https://saikirantechy.github.io/Gemma-4-blr/">https://saikirantechy.github.io/Gemma-4-blr/</a></p>
    </div>
  </body>
</html>`;
  },

  createBlob: (skill, ecosystemName) => {
    const html = docUtils.generateHtml(skill, ecosystemName);
    return new Blob([html], { type: "application/msword" });
  },

  downloadFile: (filename, blob) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  },

  downloadSkillDoc: (skill, ecosystemName) => {
    const blob = docUtils.createBlob(skill, ecosystemName);
    const fileName = `${skill.name.replace(/\s+/g, "_")}.doc`;
    docUtils.downloadFile(fileName, blob);
  },

  downloadBundleDoc: (skills, ecosystemName) => {
    const combined = skills
      .map((skill) => {
        return `<h1>${docUtils.escape(skill.name)}</h1>${docUtils.generateHtml(skill, ecosystemName).split("<body>")[1].split("</body>")[0]}`;
      })
      .join('<div style="page-break-after: always;"></div>');
    const bundleHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><title>${docUtils.escape(ecosystemName)} Documentation Bundle</title></head><body>${combined}</body></html>`;
    const blob = new Blob([bundleHtml], { type: "application/msword" });
    docUtils.downloadFile(
      `${ecosystemName.replace(/\s+/g, "_")}_Bundle.doc`,
      blob,
    );
  },
};

// Export utilities
window.GalleryUtils = {
  $,
  $$,
  storage,
  api,
  toast,
  loading,
  copyToClipboard,
  debounce,
  format,
  on,
  isMobile,
  docUtils,
};
