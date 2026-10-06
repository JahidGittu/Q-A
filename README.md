# Full Stack Web Developer Interview Preparation Platform

A modern, interactive interview preparation and revision web application tailored for Junior Full Stack Web Developer roles (e.g. RangdhanuIT) with **350 categorized questions & answers** covering core technologies, system architecture, and real production deep-dives.

## 🚀 Features

- **350 Curated Real-World Questions** across 19 categories.
- **Trilingual Answers for Every Question**:
  - **Mix (Bangla + English)**: Natural, spoken developer tone for interview boards.
  - **Pure Bangla**: Clear conceptual understanding.
  - **Simple English**: Fluent professional response with **🔊 Text-to-Speech audio** for pronunciation practice.
- **Category-wise Single-Click Expand/Collapse**: Toggle all questions in any category at once.
- **🎯 Mock Interview Simulator**: Random question selector with practice timer.
- **⚡ Instant Search (`/`)**: Real-time keyword filtering with search term highlighting.
- **📊 Progress Tracker**: LocalStorage-persisted checklists and percentage meters.
- **🌓 Dark & Light Glassmorphism UI**: High-end modern styling with responsive mobile drawer layout.

---

## 📚 Categorized Syllabus (19 Modules)

### 🔥 Tier 1 (Must Master)
1. **JavaScript** (20 questions)
2. **React** (20 questions)
3. **Next.js App Router** (20 questions)
4. **Node.js + Express** (20 questions)
5. **REST API + Auth + Security** (20 questions)
6. **Git + GitHub** (20 questions)
7. **Backend Architecture & System Design** (20 questions)

### 🟠 Tier 2 (Important)
8. **TypeScript** (20 questions)
9. **MongoDB** (20 questions)
10. **PostgreSQL + SQL** (20 questions)
11. **HTML + CSS + Tailwind CSS** (20 questions)

### 🟡 Tier 3 (Preferred & Bonus)
12. **Redux Toolkit & RTK Query** (20 questions)
13. **NestJS** (20 questions)
14. **Docker + Deployment + Linux VPS** (20 questions)
15. **SEO + Web Performance & Core Web Vitals** (20 questions)

### 🤝 Professional Communication
16. **HR & Technical Communication** (20 questions)

### 🛠️ Production Project Deep Dives (30 In-depth Questions)
17. **Dokani POS/ERP SaaS** (10 questions):
    - Row-level multi-tenant shop isolation (IDOR defense)
    - Atomic conditional stock decrement inside DB transactions
    - Refresh token rotation with SHA-256 hash in httpOnly cookies
    - bKash, Nagad, aamarPay 4-layer reconciliation and HMAC security
    - Multi-provider SMS fallback strategy
    - Background automation crons & Docker/Nginx/VPS deployment
18. **PTTABD LMS Platform** (10 questions):
    - Course curriculum tree hierarchy
    - HLS video streaming & signed URLs for piracy prevention
    - Real-time student progress calculation & caching
    - Quiz auto-grading & server-synchronized timers
    - Dynamic PDF certificate generation
19. **Lakdhanavi Corporate Web Project** (10 questions):
    - Next.js App Router server components & dynamic metadata
    - Resume/CV upload validation & path traversal prevention
    - Tiptap rich text XSS sanitization via DOMPurify
    - Lenis & GSAP animation optimization with dynamic imports
    - Dynamic XML sitemap & robots.txt generation

---

## 💻 How to Run Locally

Simply open `index.html` in any modern web browser:

```bash
# On Windows PowerShell:
Start-Process index.html
```

Or serve with any static HTTP server:

```bash
npx serve .
```
