# 📝 JournalSphere – Angular Universal Prerendered Journal App (IN WORKING)

**JournalSphere** is a fast, SEO-friendly journaling web application built with Angular and server-side rendering (SSR) using Angular Universal. It supports static prerendering for key routes like `/main` and `/new-jurnal`, optimizing load speed and visibility for both users and search engines.

---

## 🚀 Features

- ✅ **Angular Universal** support (SSR-ready)
- ⚡ **Prerendering** for faster first paint and improved SEO
- 🧱 Built with modern Angular standalone components
- 🖥️ **Express server** integration for SSR rendering
- 🧪 Optimized for production deployment
- 📁 Clean, scalable project structure

---

## 📁 Project Structure

```
src/
 ├── app/
 │   ├── main/              # Main journaling UI
 │   └── new-jurnal/        # Page to create a new journal
 ├── index.html
 ├── main.ts                # Browser entry point
 ├── main.server.ts         # Server entry point
 └── server.ts              # Express server config
```

---

## 🛠️ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run locally in development

```bash
ng serve
```

### 3. Build & prerender for production

```bash
npm run build:ssr       # Builds browser + server bundles
npm run prerender       # Prerenders specified routes
```

> Optional: you can also run directly:
> ```bash
> ng run journal-app:prerender
> ```

---

## 🔧 Useful Scripts

Add the following to your `package.json` scripts section:

```json
"scripts": {
  "build:ssr": "ng build && ng run journal-app:server",
  "serve:ssr": "node dist/journal-app/server/main.js",
  "prerender": "ng run journal-app:prerender"
}
```

---

## 📌 Prerendered Routes

The following routes are statically prerendered during build:

- `/main`
- `/new-jurnal`

You can modify them in your prerender configuration or script.

---

## 👤 Author

Francesco Maxim 
Frontend Developer @NTT DATA Romania • Student @UTCN  
📧 maaximfrancesco@gmail.com

---

## 🏷️ Tags

`angular` • `ssr` • `universal` • `typescript` • `seo` • `prerendering` • `webapp` • `journal`

---

