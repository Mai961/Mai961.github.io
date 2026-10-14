# Mai961.github.io

This is my portfolio site: a plain HTML and CSS GitHub Pages site that shows my robotics work
through short clips on one scroll-down page, `index.html`. The page is grouped into topics, with a
link at the top to each one, and every showcase links to the matching module of the [robotics
showcase](https://github.com/Mai961/robotics-showcase). There is no framework, no build step and
nothing to install. Each clip and poster is a slot listed in [media/MANIFEST.md](media/MANIFEST.md),
and any slot whose file is not there yet shows the shared placeholder,
`media/posters/placeholder.svg`. The empty `.nojekyll` file tells GitHub Pages to serve the files as
they are, without running Jekyll. GitHub Pages deploys the site from the `main` branch, root folder.

To add a showcase in 10 minutes: in `index.html`, copy an existing `<article class="showcase">`
block into the right topic section. For a new topic, copy a whole `<section class="topic">` and add
a link to its `id` in the topic nav at the top. Change the heading, the caption (it is referenced by
the video's `aria-labelledby`), the paragraph, the Details links, and every `<slug>` in the clip and
poster paths. Add a slot block for it to `media/MANIFEST.md`, copied from an existing block. Encode
the clip and extract its poster frame with the commands in `media/MANIFEST.md`, drop them into
`media/clips/<slug>.mp4` and `media/posters/<slug>.jpg`, go through the privacy checklist there,
then commit. To preview locally, run `python3 -m http.server` in the repository root and open
http://localhost:8000.
