# TripUp · Visual style: "Vivid Playful Dark"

Source of truth: the two hi-fi screens in `design/hifi/` (02 Trip plan, 07 Add expense) and the
style guide `design/style/style-guide.png`. Values below were measured from those files
(iPhone 14, 390 × 844 pt; 1 pt = 2 px in the 2× exports). Where the hi-fi screens and the style
guide differ, **the hi-fi screens win**. The machine-readable version is `tokens.css`.

## Mood
Dark, warm and playful. A near-black app shell with **bright white cards** that pop off it,
generous pill shapes, pastel avatars and colourful flat **illustrations** (warm interiors, pink,
green and orange) instead of stock photos for plan cards. Real photography only for the trip
cover. Friendly and confident, never corporate. Colour is used in small, deliberate doses:
one accent per element.

## Colour

### Brand palette
| Role | Hex | Used for |
|---|---|---|
| Primary (blue) | `#46A5F9` | Main CTA (Save expense), selected day chip ("Today"), progress, links of focus |
| Secondary (pink) | `#FF5F91` | The create FAB (+), playful highlights |
| Tertiary (purple) | `#8C57B3` | Brand accent; its dark container `#564066` is used for info/success rows |
| Highlight (yellow) | `#FABC05` | Attention only: "you owe" dot on the Expenses tab, button icons on cards |
| Neutral | `#121212` | Darkest neutral (style guide) |
| Off-white | `#FBFBFB` | Text on dark, light surfaces |

### Tonal scales (from the style guide, tones 0 → 100)
| Tone | 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 95 | 100 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Primary | #000000 | #071C33 | #113154 | #1C4877 | #29609C | #3579C3 | #4F93E2 | #72AEF9 | #A5C9FA | #D4E3FC | #EAF1FE | #FFFFFF |
| Secondary | #000000 | #390519 | #5D0E2C | #831841 | #A43058 | #C34970 | #E36289 | #EF8BA6 | #F4B4C3 | #F9DAE0 | #FCEDEF | #FFFFFF |
| Tertiary | #000000 | #29034A | #43156B | #5A3083 | #74499D | #8D62B8 | #A97CD3 | #C496EF | #DBB8FA | #EFDBFC | #F8ECFE | #FFFFFF |
| Neutral | #000000 | #1C1B1B | #313030 | #474646 | #5F5E5E | #787776 | #929090 | #ADABAA | #C8C6C5 | #E4E2E1 | #F2F0EF | #FFFFFF |

### Surfaces and text (as used in the hi-fi screens)
| Token | Hex | Where |
|---|---|---|
| `bg` | `#1A1A1A` | App background behind everything |
| `surface-raised` | `#343434` | Tab row track, segmented control track |
| `surface-button` | `#4F4F4F` | Secondary buttons on the dark background (Scan receipt, Add item) |
| `card` | `#FFFFFF` | Plan cards, expense item cards |
| `card-muted` | `#F5F5F5` | Chips inside white cards (EUR chip, "Nic & Ren excluded" note) |
| `info-container` | `#564066` | "Earlier today" row, "Items add up to €195.00" row |
| `text-on-dark` | `#FBFBFB` | Titles and values on the dark background |
| `text-on-dark-muted` | `#A8A8A8` | Labels on dark: Cancel, Paid by, Who was there, inactive tabs, names |
| `text-on-card` | `#1A1A1A` | Titles on white cards (item titles `#171717`) |
| `text-on-card-muted` | `#737373` | Secondary text on white cards ("€25.00 each") |
| `text-on-card-subtle` | `#A3A3A3` | Meta lines with clock icon ("until 20:00") |
| `text-chip` | `#525252` | Text inside light chips and the "Not decided yet" badge |
| `border-on-card` | `#D8D8D8` | Outline buttons on cards (Add a place), day chips |
| `border-subtle` | `#A3A3A3` | Dashed borders: "Not decided yet", excluded avatars |
| `divider-on-dark` | `#8C8C8C` | Amount underline, section divider |

### Status colours
| Status | Background | Dot / icon | Text |
|---|---|---|---|
| Ongoing / success | `#ECFDF5` (border `#A7F3D0`) | `#10B981` | `#047857` |
| Success check (in info rows) | `#D1FAE5` circle | `#047857` check | — |
| Not decided yet | transparent, 1.5 px dashed `#A3A3A3` | — | `#525252` |

### Avatars (pastel background + same-hue dark initials)
| Person | Background | Initials |
|---|---|---|
| Ari | `#DCEBFB` | `#1E429F` |
| Ana | `#FCE7F3` | `#9D174D` |
| Ben | `#EDE9FE` | `#6D28D9` |
| Mia | `#FEF3C7` | `#92400E` |
| Nic | `#DCEBFB` | `#1E429F` |
| Ren (guest) | `#E5E7EB` | `#374151` |
| Overflow "+2" | `#F2F2F2` | `#757575` |
Excluded / not included: white fill, 1.5 px dashed `#A3A3A3` border, initials `#A3A3A3`.
Selected (Who was there): a small dark check badge (`#1A1A1A` circle, white check, 1.5 px white ring)
at the bottom-right.

## Typography
**Plus Jakarta Sans** for everything (Google Fonts, weights 400 / 500 / 600 / 700 / 800).
Tight letter-spacing on large text (−0.02em from 24 pt up). Numbers use tabular figures in amounts.

| Style | Size / line height | Weight | Example |
|---|---|---|---|
| Display | 40 / 44 | 700 | "Lisbon" on the cover |
| Amount | 40 / 44 | 700 | "195.00" |
| Title L | 24 / 30 | 700 | Plan card titles ("Free time at the house", "Dinner") |
| Title M | 18 / 24 | 700 | Item card titles and amounts ("Food & mains", "€150.00") |
| Nav title | 17 / 22 | 600 | "New expense" |
| Body L | 17 / 24 | 500 | Section labels on dark ("Paid by", "How to split"), Cancel |
| Body | 16 / 22 | 500 | Tabs, buttons, list rows, "Each person pays" values |
| Body S | 15 / 20 | 400 | Meta lines ("until 20:00"), info rows |
| Label | 13 / 18 | 600 | Day names, badges ("Ongoing"), avatar names |
| Caption | 12 / 16 | 500 | Helper text ("Each person sees it in their own currency") |
| Avatar initials | 13 (small 11) | 700 | "AR" |

## Layout and spacing
- Screen side margin: **20 pt**. Spacing scale: 4 · 8 · 12 · 16 · 20 · 24 · 32.
- Gap between plan cards: **12 pt**. Card inner padding: **16 pt** (item cards 14 pt).
- Trip cover: full-bleed photo, ~**220 pt** tall, fading into `bg` at the bottom; trip title and
  avatar stack sit on the fade. **Collapses into a compact bar (back + title) on scroll.**
- Tab row starts 24 pt below the title; day chips 16 pt below the tabs.

## Shape
- Everything interactive is a **full pill** (radius = height / 2): buttons, tabs, day chips,
  info rows, badges, chips, inputs.
- Cards: radius **28 pt**. Images inside cards: same radius on the outer corners, flush with
  the card edge (the image fills the right ~40% of the card, full height).
- Circles: back button 40 pt (white `#FBFBFB`, dark chevron), avatars 32 pt (header) /
  48 pt (Who was there) / 24 pt (inside item cards), FAB 56 pt.
- No drop shadows on cards; depth comes from white cards on the dark background. The FAB and
  floating banners may use a soft shadow (0 6 16 rgba(0,0,0,0.25)).

## Components
- **Tab row:** `surface-raised` pill track, 48 pt tall, 4 pt padding. Selected tab = white pill
  with `#1A1A1A` 600 text; inactive = `#A8A8A8` 500 text. Indicator: 8 pt yellow `#FABC05` dot
  after the label (Expenses = you owe; Polls = a poll waits for your vote).
- **Day chips:** 4 equal pills, 56 pt tall, white with `border-on-card`; number 18/700
  `#000000`, day 13/500 `#5C5C5C`. Today: `#46A5F9` fill, white text, label "Today".
- **Info row** ("Earlier today", "Items add up to…"): `info-container` pill, 40 pt tall,
  white check in a circle on the left, `#FBFBFB` text, optional "2 done ⌄" on the right.
- **Plan card:** white, radius 28, text left / illustration right. Badge → title → meta (clock
  icon, `#A3A3A3`) → buttons stacked at the bottom-left.
- **Buttons:**
  - On white cards: *Primary* = `#1A1A1A` fill, white 16/600 text, **yellow `#FABC05` icon**;
    *Secondary* = white fill, 1.5 px `border-on-card`, `#1A1A1A` text, yellow icon. Height 40 pt,
    width hugs the label.
  - On the dark background: *Secondary* = `surface-button` `#4F4F4F` fill, white text and icon,
    48 pt tall, equal widths in pairs.
  - *Main CTA* (bottom of forms): full width, 56 pt, `#46A5F9` fill, 17/700 label.
  - Text links: underlined, `text-on-dark` (selected) or `#A8A8A8`.
- **FAB:** 56 pt pink `#FF5F91` circle, white + (2 pt stroke), bottom-right 20 pt from the edges.
- **Segmented control** (Equally / By item): same as the tab row.
- **Item card:** white, radius 28, title + amount row, small avatars row with "€x each" right
  aligned in `#737373`, optional note chip (`card-muted`, `#525252` text).
- **Amount input:** large 40/700 number in `#FBFBFB`, EUR chip (`card-muted`, `#1A1A1A`
  600 text, ⌄), 2 pt underline `#8C8C8C`, helper caption below.
- **Pill select** (Paid by): white pill, avatar + "You (Ari)" 16/600 + ⌄.
- **Cover chip** ("Change Image"): translucent dark pill over the photo
  (rgba(26,26,26,0.45) with background blur), yellow image icon, white 15/500 text.
- **Bottom sheets, toasts, banners:** sheets are `card` white with 28 pt top radius on the dark
  scrim; toasts and in-app banners are `#343434` pills with `#FBFBFB` text and a primary-blue
  action label.

## Icons
Outline icons with rounded caps and joins, 1.75–2 pt stroke, 18–20 pt in buttons, 16 pt in meta
lines. Icon colour follows the text, except card button icons, which are yellow `#FABC05`.
Icon set: **[choose one: Lucide (closest to the hi-fi screens) or Material Symbols Rounded
(used in the style guide)]**.

## Imagery
- Trip cover: real photo of the destination, warm and slightly desaturated, with a dark gradient
  (transparent → `#1A1A1A`) over the bottom half.
- Plan cards: flat, colourful illustrations of the place (warm interiors, pink / green / orange /
  cream), no outlines, soft shading. Use placeholder illustrations in the same palette when no
  image exists.
