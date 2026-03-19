# Security Policy

## Contact Form Setup

This portfolio uses [Web3Forms](https://web3forms.com) for the contact form.

To enable the contact form locally or when self-hosting:

1. Get a free access key at <https://web3forms.com>
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Set your key in `.env`:
   ```
   PUBLIC_WEB3FORMS_KEY=your_access_key_here
   ```

> **Note**: The `.env` file is gitignored and will never be committed.
> When deploying to GitHub Pages, add `PUBLIC_WEB3FORMS_KEY` to your repository's
> **Settings → Secrets and variables → Actions → Variables** (not Secrets, since it's a public key).

## Reporting Security Issues

If you discover a security vulnerability, please open a [GitHub Issue](../../issues) or email **zahidhasan9297@gmail.com** directly.
