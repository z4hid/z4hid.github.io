# Md. Zahid Hasan — AI Engineer Portfolio

A dark-themed, performance-optimized portfolio website built with **Astro**. Features interactive animations, blog system with Markdown posts, certificate showcase, and SEO-first architecture.

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Tech Stack

- **Framework**: [Astro](https://astro.build) (Static Site Generator)
- **Styling**: Vanilla CSS with custom design system
- **Fonts**: Clash Display + Plus Jakarta Sans + JetBrains Mono
- **Icons**: [Font Awesome 6.5](https://fontawesome.com)
- **Contact Form**: [Web3Forms](https://web3forms.com)
- **Deployment**: GitHub Pages

## 📁 Project Structure

```
├── public/
│   ├── blog/          # Blog post images
│   ├── certificates/  # Certificate screenshots (PNG)
│   ├── favicon.svg
│   ├── og-default.png # Default social share image
│   └── robots.txt
├── src/
│   ├── components/    # Header, Footer
│   ├── content/blog/  # Markdown blog posts
│   ├── data/          # Projects, certificates data
│   ├── layouts/       # BaseLayout, PostLayout
│   ├── pages/         # Astro pages
│   └── styles/        # Global CSS design system
├── astro.config.mjs
└── package.json
```

## 📝 Writing Blog Posts

Create a new `.md` file in `src/content/blog/`:

```markdown
---
title: 'Your Post Title'
description: 'A short description'
pubDate: 2026-03-03
tags: ['ai', 'tutorial']
---

Your content here. Use images from `/blog/`:

![Diagram](/blog/your-image.png)
```

## 🌐 Deployment

Automatically deploys to GitHub Pages via `.github/workflows/deploy.yml` on push to `main`.

## 📊 Analytics & Search Console

1. Copy env template and set values:
   - `cp .env.example .env`
   - `PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
   - `PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_token`
2. Build and deploy. GA script and Search Console meta tag are injected site-wide.
3. In Google Search Console, submit sitemap:
   - `https://z4hid.github.io/sitemap-index.xml`

## 📄 License

MIT — feel free to fork and customize for your own portfolio.
