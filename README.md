# Personal Portfolio

A responsive portfolio with a separate charcoal portrait commissions page, built with React, Vite, and Tailwind CSS.

## Run it locally

Use Node.js 20.19 or newer on the 20.x line, or Node.js 22.12 or newer. From the project folder, run:

```sh
npm install
npm run dev
```

Open the local URL printed in the terminal. Run `npm run build` to generate the static site in `dist/` and `npm run preview` to check the production build before hosting it.

## Update portfolio content

Edit `src/content.js`. The layout and components live in `src/main.jsx`. Section colors, type, and layout rules are in `src/styles.css`.

| Update | Where to change it |
| --- | --- |
| Name, title, tagline, bio | `profile` |
| Portraits and CV | Edit `profile.heroPortrait`, `profile.portrait`, `profile.portraitAlt`, and `profile.portraitLabels`. Set `profile.cv` to a public CV asset to enable the download button. |
| Projects | Add, remove, or reorder the entries in `projects`. Give each project a unique `id` and include a verified `result`. |
| Project images | Set `cover` and `detailImage` asset paths and update their alt text. Set `illustrativeImages` to `false` after replacing the mockups with actual project images. |
| Resume | Edit `skills`, `education`, and `experience`. Timeline entries have a title, date, and optional detail. |
| Certificates | Place PDFs or images in `public/certificates/`. Add each one to `certificates` with a `title` and `file` (for example, `certificates/my-certificate.pdf`). Set `issuer`, `date`, `type`, or an image `thumbnail` as needed. The first entry leads the section. |
| Charcoal commissions | Edit `charcoal` for the commission copy and inquiry details. For the gallery, add entries with an `image` asset path, `alt` text, and an optional `caption`. |
| Testimonials and awards | Edit `recognition`. Set either group's `enabled` to `false` to hide it. When both groups are hidden, the section and its navigation link disappear. |
| Services | Set `services.enabled` to `false` to hide the section and its navigation link. Update the availability and service descriptions in the same object. |
| Email and profiles | Update `contact.email` and the URL for each entry in `contact.socials`. Remove the `sample` flag when the profile link is yours. |

Put replacement assets in `public/assets/` and use paths like `assets/my-portrait.jpg` in the data file. Use the following as crop guides:

| Asset | Suggested dimensions |
| --- | --- |
| Hero portrait | 432 x 486 px, or a larger image with the same crop |
| About portrait | 332 x 358 px. Leave space for the amber labels near the edges. |
| Project cover | 840 × 560 px |
| Case-study image | 1000 × 620 px |
| CV | A PDF with a descriptive filename |

Update the page description in `index.html` before publishing.

The theme uses Gloock and Montserrat from the supplied design. These fonts load from Google Fonts. The browser uses Georgia and Arial fallbacks when offline.

The hero fills the viewport. GSAP and ScrollTrigger load from jsDelivr for the layered hero, section reveals, staggered project images, and mouse sparkle trail. Motion is skipped when those files are unavailable or reduced motion is enabled.

## Connect the contact form

By default, the form opens a prefilled draft in the visitor's email app. To send from the site, set `contact.endpoint` to a service URL that accepts a JSON `POST` with `name`, `email`, and `message` fields and returns a successful HTTP status after accepting the message. The form displays success or failure feedback. If the endpoint is on a different origin, configure it to allow requests from the portfolio's origin. Keep service secrets on the server.

## Keyboard controls

Use Tab to reach the navigation, project cards, and contact form. Enter opens a focused project card. Escape closes the case study and returns focus to its card. Escape also closes the narrow-screen navigation and returns focus to the menu button.
