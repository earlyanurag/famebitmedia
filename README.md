# FameBit Media — redesigned pages (front-end)

Open `index.html` in a browser. All pages share `styles.css`.

| File | Page | Change IDs from the spec |
|---|---|---|
| index.html | Homepage (updated to the Figma review, Sep 2026) | NAV-01, HOME-01 to HOME-10, FOOT-01, HIRE-02, MOB-01 |
| hire-team.html | Hire the FameBit team + pricing | HIRE-01, PKG-01 |
| book-call.html | Qualify + schedule | BOOK-01 |
| invoice.html | FameBit Invoice Studio (full rebuild) | INV-01 |

## What the developer must connect (search the code for `TODO (developer)`)
1. **Leads**: request-price / list-enquiry form in index.html → POST to your leads API (add OTP phone check).
2. **Bookings**: book-call.html and the homepage `#meet` section use the official Cal ID inline embed (`CalEmbed` in cal.js, calLink famebitmedia/product-walkthrough, month view, brand colour #7C3AED). If Cal ID cannot load, it falls back to a month calendar that opens the Cal ID page on the chosen day. Add a Cal ID webhook to create the lead in admin.
3. **Creator data**: replace the `CREATORS` sample array in index.html with the API. Use cached profile photos; keep the initials fallback.
4. **Logo**: `.logo` is a text placeholder — replace with the official FameBit SVG logo (do not redesign it).
5. **Placeholders to replace**: all stats (10,000+, 300+, ₹10 Cr+), testimonials, campaign results, package prices (₹X,XX,XXX), GSTIN/CIN in footer, emails.
6. **Invoice Studio**: saves to the browser (localStorage). Add login + server storage for "My invoices" across devices. PDF uses the browser's print-to-PDF (one A4 page); swap for server-side PDF if needed. UPI QR uses qrcodejs from cdnjs.

## Behaviour already built
- Sticky header with dropdowns and mobile menu; mobile sticky WhatsApp + Book bar.
- Hero live demo (niche chips), filters, shortlist (saved in browser), compare up to 3 with a "Best match" verdict.
- Floating "Book a free call" card after the hero; hire-team nudge after 3 shortlists / 60 s on directory / exit intent — once per session, hidden 3 days after closing.
- Indian mobile number validation, GST (IGST vs CGST+SGST by state), TDS line, amount in words (lakh/crore), 3 invoice designs, 6 accent colours, saved brands, invoice history, WhatsApp share.

## Figma review changes (Sep 2026)
- Header (all pages): "For creators" order is now Free invoice maker, Talent management, Join as a creator. "Case studies" links to `index.html#case-studies`.
- Homepage order: Hero, logo strip (from V2), stats, problem, browse creators, compare (from V2), paths, ready-made lists, services, recent campaigns, testimonials, closing CTA, case studies, booking.
- Stats: 10,000+ creators vetted, 2,000+ performance content delivered, ₹10 Cr+ budget managed, with three equal, aligned cards.
- Compare section and the "2 / 3 selected, Compare now" tray are ported from V2. The tray replaces the old shortlist bar.
- Testimonials are a carousel, restyled from the CultureX reference.
- FAQ removed.
- New Case studies explorer: 15 campaigns from the FY26 cred deck, filterable by channel. Campaign tiles and testimonial links open the matching case.
- New booking section with a gradient border (Cal.com-style: month calendar, time slots, details form, confirmation).

## New developer TODOs
7. **Testimonials**: quotes, names, roles and photos are placeholders (`T` array in index.html). Metrics come from the deck.
8. **Booking section** (`#meet`): availability is mocked. Replace it with a Cal.com / Calendly embed or the booking API, and reuse the same POST as book-call.html.
9. **Logo strip**: 20 client logos in `/logos` (trimmed, 96px tall WebP), shown in the old text grey (#A7A2BC). Edit the `LOGOS` list in index.html to add or reorder.
10. **Campaign tiles**: replace the gradients with video posters or reels.

## Homepage changes (Sep 2026, round 2)
- Hero: the three feature chips (Find creators, Compare side by side, Or hire our team) now sit in a fixed row above the demo, so they stay visible and aligned at every zoom level.
- Logo strip: shows image logos in grey. Add files to `/logos` and set `src` in the `LOGOS` list in index.html; a brand without a file falls back to grey text.
- Container widened from 1200px to 1280px. At 1000–1200px the header hides "Explore free" so the menu fits.
- Browse creators: location pin before the city; "Engagement" replaced by "Avg. views".
- Compare tray: light lavender gradient instead of dark.
- Ready-made lists: two rows of small "Top 10 …" bars (city and category) under the four list cards. Clicking one opens the enquiry form.
- Services: point-wise descriptions; "Telegram ads" renamed "Telegram marketing" everywhere.
- Recent campaigns: 8 tiles in two rows scrolling in opposite directions, blurred edges, pause on hover.
- Testimonials: metrics removed.
- Case studies: 4-tile collage + "Read all case studies" / "Read your competitor's case studies" buttons, linking to `case-studies.html` (page to be added; tiles link to `case-studies.html#<case-id>`).
- Booking (`#meet`): Cal ID embed (cal.id/famebitmedia/product-walkthrough) in a thin-bordered BorderGlow card.
- `effects.js`: plain-JS ports of React Bits GradualBlur and BorderGlow (no React or mathjs needed). A soft GradualBlur runs along the bottom edge of the screen on index, hire-team and book-call. Not added to the Invoice Studio, where it would blur the invoice being edited.

## Homepage changes (round 3)
- Hero "Trusted by 300+ Indian brands": the S, P, F circles show the Sova, Plix and Fast&Up marks (`logos/mark-*.webp`).
- Ready-made lists: each "Top 10" bar has its own soft colour.
- What we run for you: light background graphics (growth line, video frames, chat bubbles, sales bars).
- Recent campaigns: tiles dissolve into the page at both edges (CSS mask, no blur panels); "Show more" button to case-studies.html.

## Phone layout (round 4)
- Below 600px, long card stacks become swipe rows (next card peeks in): stats, browse creators, paths, ready-made lists, services, case studies, and on hire-team the steps and plans.
- Hero feature chips become one compact 3-up row; category filter chips scroll on one line.
- Tighter section spacing and smaller headings on phones. Homepage on a phone went from about 20,000px to about 12,000px tall.
- Invoice Studio top bar fits 360px screens.
- 30-minute call card (homepage and book-call): thin 2px border with a light that travels around it (`.shine` in styles.css, 4.5s loop, still for reduced-motion users).

## Round 5
- Header (all pages): hides while scrolling down, slides back on a small scroll up; always shown near the top, with the mobile menu or a dropdown open, or with keyboard focus (`autoHeader` in effects.js).
- Page-edge GradualBlur kept, but the footer has extra bottom room so its text is never blurred. On phones the blur sits just above the WhatsApp / Book bar.
- Phone-only (below 600px): Browse shows a 3-creator preview + "Browse all creators" (creators.html); Compare shows a "Compare creators" button (compare.html) instead of the wide table; paths are small rows; Lists shows 2 lists + 4 Top-10 bars + "View all lists" (lists.html); services are a 2x2 grid; case studies are 2x2 tiles; shortlist band, booking section and calendar are compacted.
- TODO (developer): create creators.html, compare.html, lists.html and case-studies.html (the buttons already link to them).
