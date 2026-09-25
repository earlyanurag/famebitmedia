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
2. **Bookings**: book-call.html and the homepage `#meet` section embed Cal ID (cal.id/famebitmedia/product-walkthrough). Add a Cal ID webhook to create the lead in admin.
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
9. **Logo strip**: client names are text. Swap in the real grey logo SVGs.
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
