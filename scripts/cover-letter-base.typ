// ── Cover Letter Base Template — Johann Glock ────────────────────────────────
//
// Shared layout, styling, and header for all cover letters.
// Per-application letter files import this and call cover-letter().
//
// Usage in application files:
//   #import "/scripts/cover-letter-base.typ": cover-letter
//   #show: cover-letter
//   ... application-specific content (date, subject, body, closing) ...

// ── Private contact inputs ────────────────────────────────────────────────────

#let cv-email = sys.inputs.at("email", default: "")
#let cv-phone = sys.inputs.at("phone", default: "")

// ── Colors (indigo-light theme tokens — matches CV) ──────────────────────────

#let accent  = oklch(48.1%, 0.199, 281.9deg)
#let c-text  = oklch(22.8%, 0.038, 282.9deg)
#let c-head  = oklch(16.8%, 0.017, 284.5deg)
#let c-muted = oklch(48%,   0.051, 284.3deg)

// ── Main template function ───────────────────────────────────────────────────

#let cover-letter(body) = {

  // ── Page setup ──────────────────────────────────────────────────────────────

  set page(
    paper: "a4",
    margin: (top: 24mm, bottom: 24mm, left: 25mm, right: 25mm),
  )

  // ── Typography ──────────────────────────────────────────────────────────────

  set text(
    font: "Inter",
    size: 10.5pt,
    fill: c-text,
    lang: "en",
    kerning: true,
    ligatures: true,
    overhang: true,
  )

  set par(
    justify: true,
    leading: 0.65em,
    spacing: 1.2em,
  )

  // Links: accent color, subtle underline
  show link: it => text(fill: accent)[#underline(
    stroke: accent.transparentize(65%),
    offset: 1.5pt,
    it
  )]

  // ── Header ──────────────────────────────────────────────────────────────────

  {
    text(size: 20pt, weight: 800, tracking: -0.6pt, fill: c-head)[Johann Glock]
    v(3pt)
    let contact-parts = ([Hagenberg im Mühlkreis, Austria],)
    if cv-email != "" { contact-parts.push(cv-email) }
    if cv-phone != "" { contact-parts.push(cv-phone) }
    text(size: 9.5pt, fill: c-muted, contact-parts.join([#h(5pt)·#h(5pt)]))
    v(1pt)
    text(size: 9.5pt, fill: c-muted)[
      #link("https://glockyco.com")[glockyco.com]
      #h(5pt)·#h(5pt)
      #link("https://github.com/glockyco")[GitHub]
      #h(5pt)·#h(5pt)
      #link("https://www.linkedin.com/in/johann-glock-486a9b221/")[LinkedIn]
      #h(5pt)·#h(5pt)
      #link("https://orcid.org/0000-0002-0152-8611")[ORCID]
    ]
  }

  v(2pt)
  line(length: 100%, stroke: 1.5pt + accent)

  // ── Application-specific content ────────────────────────────────────────────

  body
}
