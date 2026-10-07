# Mai961.github.io

This is my portfolio site: a plain HTML and CSS GitHub Pages site that shows my robotics work
through short clips, with one page per project and a link from each page to the matching module of
the [robotics showcase](https://github.com/Mai961/robotics-showcase). There is no framework, no
build step and nothing to install: every page is a file you can open in a browser. Each clip and
poster is a slot listed in [media/MANIFEST.md](media/MANIFEST.md), and any slot whose file is not
there yet shows the shared placeholder, `media/posters/placeholder.svg`. The empty `.nojekyll` file
tells GitHub Pages to serve the files as they are, without running Jekyll. Pages is not enabled
yet; when I choose to publish, it is enabled in the repository settings to deploy from the `main`
branch, root folder.

To add a project page in 10 minutes: copy one of the files in `projects/` to
`projects/<new-slug>.html`, then change its `<title>`, `<meta name="description">`, heading, text,
and every `<slug>` in the clip and poster paths. Add a card for it to the Projects grid in
`index.html`, copying an existing card and changing its slug, title and sentence. Add a slot block
for it to `media/MANIFEST.md`, copied from an existing block. Encode the clip and extract its poster
frame with the commands in `media/MANIFEST.md`, drop them into `media/clips/<new-slug>.mp4` and
`media/posters/<new-slug>.jpg`, go through the privacy checklist there, then commit. To preview
locally, run `python3 -m http.server` in the repository root and open http://localhost:8000.
