Personal website project

Static site built with Astro. Content is Markdown in `src/content`.

- `npm run dev` to work locally, `npm run build` to build, `npm run deploy` to publish `dist` to GitHub Pages. The deploy script passes `--nojekyll`: without it GitHub Pages drops the `_astro` folder and the site loses its CSS and fonts.
- `figures/` holds the plot style (`atlas.mplstyle`) and the scripts that generate the illustrative figures and diagrams. Run them from the repo root. `figures/work_figures.py <research-studies dir>` redraws each paper's key figure into `src/assets/works/<work id>.svg`; the newest paper with a figure leads the home page. A work without an SVG can show a screenshot instead: put it in `public/images/works/` and set `image` in its front matter. After changing `src/lib/rehype-figures.mjs`, delete `.astro` and `node_modules/.astro` or the dev server keeps serving old post HTML.
- `arsenal.md` is the running list of topics and site backlog.
