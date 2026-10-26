IRON FOX STUDIO — UNIVERSE REDESIGN PREVIEW

What's changed:
- Added universe.css: shared black/obsidian + plasma-orange design system, glassy navigation, metallic cards, responsive layouts, focus states and reduced-motion support.
- Added universe.js: atmospheric 3D-inspired orbit motif, subtle pointer parallax, active-page navigation and consistent navigation for the projects page.
- Applied the shared design layer to the existing HTML pages.
- Kept the existing Three.js homepage scene in redesign.js.
- Fixed the Samurai Survivors home link and added project anchor targets for Shadow Knight and Cowboy Adventure.
- Improved the Games page card links where possible.

Run locally:
1. Extract this folder.
2. Open a terminal inside "Iron Fox Studio".
3. Run: python -m http.server 8000
4. Open http://localhost:8000

Notes:
- The homepage Three.js scene and Google Fonts use external CDNs, so internet access is needed for those resources.
- The homepage fox emblem is still procedural placeholder geometry, not a production-quality fox-head model.
- This is a first-pass visual integration. Please test Firebase authentication, Settings, all external links, and form behavior in a local browser before publishing.
- Firebase.js includes client-side Firebase configuration. Review Firebase security rules and never add private service-account keys or secrets to client files.


PORTAL UPDATE (October 2026):
- Added a cinematic same-site portal transition with reduced-motion support.
- Expanded shared ambient 3D layers and mobile typography/layout rules.
- Corrected the home-page Shadow Knight and Cowboy Adventure cards to open their own detail pages.
- The existing Images/Logo.jpg artwork is preserved; no logo replacement or redraw was made.
- All effects are decorative and do not intercept external links, modified clicks, or downloads.
