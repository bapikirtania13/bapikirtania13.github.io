# Kirtania — Developer Website

Official website of **Kirtania**, an independent Android app developer.

🔗 **Live Site:** [https://kirtania.github.io/](https://kirtania.github.io/)

---

## About

This is a static website built with HTML5, CSS3, and Vanilla JavaScript. It serves as the official developer website for the Kirtania Google Play developer account and is designed to:

- Represent the developer identity on the web
- Help verify the Google Play developer account
- Provide privacy policy and terms for published apps
- Showcase Android applications

---

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Structure and content |
| CSS3 | Styling and responsive design |
| Vanilla JavaScript | Interactivity (theme toggle, mobile menu, scroll effects) |
| Google Fonts (Inter) | Modern typography |

No frameworks, libraries, or build tools required.

---

## Folder Structure

```
/
├── index.html          # Main landing page
├── privacy.html        # Privacy Policy
├── terms.html          # Terms & Conditions
├── 404.html            # Custom 404 error page
├── style.css           # All styles
├── script.js           # All JavaScript
├── robots.txt          # Search engine directives
├── sitemap.xml         # Sitemap for SEO
├── README.md           # This file
└── assets/
    ├── logo.png            # Developer account logo (Kirtania)
    ├── banner.png          # Developer account banner
    ├── pito-notes-logo.png # Pito Notes app icon
    ├── logo.svg            # SVG logo fallback
    └── favicon.svg         # Favicon
```

---

## Deploy on GitHub Pages

Follow these steps to deploy this website using GitHub Pages:

### Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in.
2. Click the **+** icon in the top-right and select **New repository**.
3. Name the repository (e.g., `kirtania.github.io` for a user site, or any name for a project site).
4. Set it to **Public**.
5. Do **not** initialize with a README (we already have one).
6. Click **Create repository**.

### Step 2: Push the Code

Open a terminal in the project folder and run:

```bash
git init
git add .
git commit -m "Initial commit: Kirtania developer website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name.

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub.
2. Click **Settings** → **Pages** (in the left sidebar).
3. Under **Source**, select **Deploy from a branch**.
4. Choose the **main** branch and **/ (root)** folder.
5. Click **Save**.

### Step 4: Access Your Site

Your website will be live within a few minutes at:

- **User site:** `https://YOUR_USERNAME.github.io/`
- **Project site:** `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### Step 5: Update Canonical URLs (Important)

After deploying, update the canonical URLs and Open Graph URLs in all HTML files to match your actual GitHub Pages URL:

1. Open `index.html`, `privacy.html`, and `terms.html`.
2. Find all instances of `https://kirtania.github.io/` and replace with your actual site URL.
3. Update `sitemap.xml` and `robots.txt` with the correct base URL.
4. Commit and push the changes.

---

## Features

- ✅ Responsive mobile-first design
- ✅ Dark / Light mode with localStorage persistence
- ✅ Smooth scroll navigation
- ✅ Back-to-top button
- ✅ SEO optimized (meta tags, Open Graph, Twitter Cards, JSON-LD, sitemap)
- ✅ Accessibility-friendly (semantic HTML, ARIA labels, keyboard navigation)
- ✅ Google Play Console compatible privacy policy
- ✅ Professional terms and conditions
- ✅ Custom 404 page
- ✅ No external dependencies or build steps
- ✅ Lightweight and fast loading

---

## License

© 2026 Kirtania. All Rights Reserved.

---

## Contact

- **Email:** [business.kirtania@gmail.com](mailto:business.kirtania@gmail.com)
- **Google Play:** [Developer Page](https://play.google.com/store/apps/dev?id=7172278988293432799)
