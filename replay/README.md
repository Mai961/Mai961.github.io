# Replay clips

These are MCAP recordings of ROS 2 bags behind the project showcase and the [robotics
showcase](https://github.com/Mai961/robotics-showcase) repository, hosted here so visitors can
download them and open them locally in Foxglove Studio, or in the viewer linked from the site.

The match, whole-body and clock-sync clips, with their `metadata.yaml` and layout files, are
byte-identical copies of the showcase repository's: the match and whole-body clips from its
public-evidence branch, the clock-sync clip from main. The match clip holds the localizer and the
field EKF over the same 20 s of a recorded match, with the field and tag scene topics, derived path
and fix display topics, and the blurred detection image. The whole-body clip is a shop-session cycle
with the arm on the field through the full transform chain; the node's parameter and debug topics
are not included, and the recorded path is cropped to the clip.

| File | Size | Source |
|---|---|---|
| `match/match-20s.mcap` | 6.1 MB | bag `20260905-134217`, 66.8 s to 86.8 s; showcase repository, public-evidence branch: `state-estimation/replay/match-20s.mcap` |
| `wholebody-shop/wholebody-cycle-shop.mcap` | 3.1 MB | bag `20260818-140551`, 65.95 s to 75.25 s; showcase repository, public-evidence branch: `control/wholebody-2026/replay/wholebody-cycle-shop.mcap` |
| `udp-bridge/clock-sync-154s.mcap` | 18 KB | showcase repository, main: `udp-bridge/replay/clock-sync-154s.mcap` |

One more clip is hosted here that is not in the showcase repository:

| File | What it is |
|---|---|
| `odin-cloud-slam/odin-cloud-slam-20s.mcap` | The first 20 s of a recorded shop bag (0–20 s): the point cloud (every third message), odometry, transforms, localizer fixes, field and tag scene topics, and the blurred detection image; the recorded path is cropped to the clip window; 25.6 MB. The point cloud is the Odin camera driver's own output. Its folder also holds the rosbag2 `metadata.yaml`, a `README.md` with the details, and `foxglove-layout.json`. |

The files are stored in plain git (no LFS), marked `binary` in `.gitattributes`.

`_headers` is only used if this repository is served by Cloudflare Pages; on GitHub Pages it is
inert. The viewer loads the clips from the R2 mirror.

## Foxglove hosting

The same files, with their layouts, are mirrored to a Cloudflare R2 bucket so the viewer can open
them by URL; r2.dev is Cloudflare's rate-limited development domain, enough for a few demo files.
The bucket keys match the paths under `replay/`:

- `match/match-20s.mcap`
- `wholebody-shop/wholebody-cycle-shop.mcap`
- `udp-bridge/clock-sync-154s.mcap`
- `odin-cloud-slam/odin-cloud-slam-20s.mcap`

The viewer buttons on the site open each clip in a hosted viewer,
https://replay-viewer-e62.pages.dev/, a deployment of Lichtblick (an open-source, MIT-licensed build
of Foxglove Studio). A viewer link follows this template, with both URLs URL-encoded:

```
https://replay-viewer-e62.pages.dev/?ds=remote-file&ds.url=<R2 URL of the .mcap>&layoutUrl=<R2 URL of the layout>
```

The layout loads from the same R2 folder as the clip: `<folder>/foxglove-layout.json`. For example,
the clip `match/match-20s.mcap` opens with `match/foxglove-layout.json`.
