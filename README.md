# Personal Website

My portfolio and CV site presents my research, software projects and academic work. This repository is the source for [glockyco.com](https://glockyco.com), including the web CV and the local tools for PDF CVs and cover letters.

## Run locally

You need Git LFS, Node.js and pnpm. [flake.nix](flake.nix) supplies the development tools, including Typst for PDFs, on Linux and macOS:

```sh
nix develop
git lfs pull
pnpm install --frozen-lockfile
pnpm dev
```

If you already have those tools, skip `nix develop`. Use the pnpm version declared in [package.json](package.json).

To build and preview the static site:

```sh
pnpm build
pnpm preview
```

## Change the content

[src/lib/data](src/lib/data) is the source of truth for positions, publications, teaching, talks and projects. Update those TypeScript modules rather than editing the rendered pages or PDFs. Their Zod schemas validate the records when the modules load.

Page layouts live in [src/routes](src/routes), and shared UI lives in [src/lib/components](src/lib/components). Teaching appears in the CV. Research tools appear under Research rather than Projects.

For the contact link, copy [.env.example](.env.example) to `.env.local` and follow its base64 instructions. `PUBLIC_CONTACT_EMAIL_B64` is public site data, not a secret.

## Generate PDFs

Install Typst, or use the development shell above:

```sh
pnpm pdf
pnpm pdf:full
```

`pnpm pdf` generates the public CV and builds the site with it. `pnpm build` alone does not regenerate the PDF. The full variant writes a local application CV instead. See [scripts/generate-pdf.ts](scripts/generate-pdf.ts) for output locations.

For the full variant, set `CV_EMAIL` and optionally `CV_PHONE` in your shell or `.env.local`. Do not publish the full PDF with the site.

Cover letters also require access to the private [applications](applications) submodule:

```sh
git submodule update --init
pnpm cover-letter <application>
pnpm cover-letter:full <application>
```

Replace `<application>` with a directory in that submodule. The full variant uses the same contact variables. [scripts/compile-cover-letter.ts](scripts/compile-cover-letter.ts) defines the input and output paths, and [scripts/cover-letter-base.typ](scripts/cover-letter-base.typ) holds the shared template. You do not need the submodule to work on the site or generate a CV.

## Refresh project screenshots

```sh
pnpm exec playwright install chromium
pnpm screenshots
```

The capture script visits the project links from the data modules and writes screenshots to the site assets. Review the changed images before publishing.

## Checks and publishing

[package.json](package.json) defines the commands, and the [CI workflow](.github/workflows/ci.yml) defines the automated checks:

```sh
pnpm check
pnpm lint
pnpm test
```

To format only a changed file, use `pnpm exec prettier --write <file>`. The `format` script formats the whole repository.

With access to the Cloudflare account, publish the site with:

```sh
pnpm cf-deploy
```

This runs the checks, regenerates the public PDF, builds the site and uploads the build through Wrangler. It publishes your local checkout, not a GitHub branch. [wrangler.toml](wrangler.toml) defines the deployment target.

## License

[LICENSE](LICENSE) applies the MIT License to source code only. Site content, photographs, CV data, visual design and other non-code assets are copyright Johann Glock. All rights reserved.
