# Golden Crown Realty website

A single-page static site: one `index.html` file with all styles and scripts inside it. No build step.

## Fill in placeholders
Anything with a dashed gold outline on the page is a placeholder. In the code, search for `class="ph"` and `[` brackets. Once real text is in, remove the `<span class="ph">` wrapper.

- Hero: neighborhoods line
- About: founding story, what sets the company apart, photo
- Stats: real figures only (delete any you don't want to publish)
- Focus Areas: three neighborhoods with one line each
- Contact: address, phone, email, hours
- Logo: replace the crown SVG in the header with your logo file

## Photos
Create an `images/` folder next to `index.html`.
- Hero background: see the commented CSS line under "Hero" in the `<style>` block.
- About photo: replace the `<div class="about-visual ...">` contents with `<img src="images/about.jpg" alt="...">`.

## Contact form
Static sites can't send email on their own. Pick one:
- **Netlify:** add `data-netlify="true"` to the `<form>` tag and remove the `action` URL. Submissions show up in your Netlify dashboard and can be emailed to you.
- **Formspree:** create a free form at formspree.io and replace `YOUR_FORM_ID` in the form's `action`.

## Publish it (free)
**Netlify (easiest):** go to app.netlify.com/drop and drag this folder onto the page. It goes live right away. Add a custom domain under Domain settings.

**GitHub Pages:** create a repo, upload these files, then Settings > Pages > deploy from the `main` branch.

**Vercel:** import the GitHub repo at vercel.com; no settings needed.

## Custom domain
Buy the domain (Namecheap, Cloudflare, Google/Squarespace Domains, etc.) and follow your host's instructions to point it at the site. All three hosts above include free HTTPS.
