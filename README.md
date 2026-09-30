# E-Wedding Invitation (React + Vite + TypeScript)

A mobile-first animated wedding invitation:

- Embossed lavender envelope with a wax seal (tap to open)
- "You're Cordially Invited" reveal with a fluttering butterfly
- Scratch-to-reveal wedding date (Month / Day / Year) + live countdown
- "Our Little Story" swipeable cards
- Sacred Ceremonies cards (venue, map button, schedule)
- Background music toggle, WhatsApp RSVP, and per-guest links (`/?guest=Priya`)

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in /dist
```

## Make it yours

1. **Text, dates, venues** → edit `src/config.ts` (the only file you need for content).
2. **Illustrations/photos** → put files in `public/images/` and reference them in `src/config.ts`
   (`image: "/images/story-1.jpg"`). Until then, tinted placeholders are shown.
3. **Music** → add `public/music.mp3` (use music you have the rights to). If the file is missing, the music button hides itself.
4. **Colours & fonts** → CSS variables at the top of `src/styles.css`; fonts are loaded in `index.html`.
5. **Guest links** → share `https://your-site.vercel.app/?guest=Name` to greet each guest by name.

## Deploy (free)

Push to GitHub → import the repo on vercel.com → framework "Vite" → Deploy.
Or: `npm i -g vercel && vercel`.
