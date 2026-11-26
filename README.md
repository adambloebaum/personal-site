Personal website project

Static site built with Astro. Content is Markdown in `src/content`.

- `npm run dev` to work locally, `npm run build` to build, `npm run deploy` to publish `dist` to GitHub Pages.
- `figures/` holds the plot style (`atlas.mplstyle`) and the scripts that generate the illustrative figures and diagrams. Run them from the repo root. `figures/hero.py` builds the home page figure (`src/assets/hero.svg`) from the public OpenBiomechanics release; pass it the folder holding `energy_flow.zip` and `metadata.csv`.
- `arsenal.md` is the running list of topics and site backlog.
