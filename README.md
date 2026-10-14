# Xenon Studio Docs docs

Built with [Docusaurus](https://docusaurus.io/) and set up by Paperkraft.

## Run it

```bash
npm install
npm start
```

## Publish it

Any static host works. Build with `npm run build`; the site is in `build/`.

- **Vercel**: import this repository. Vercel recognises Docusaurus.
- **Netlify**: build command `npm run build`, publish directory `build`.
- **GitHub Pages**: see https://docusaurus.io/docs/deployment#deploying-to-github-pages

Then set `url` in `docusaurus.config.ts` to your docs address, and add that address in Paperkraft › Settings so it scans your site every day.
