# Replay clips

These are MCAP recordings of ROS 2 bags from the
[robotics showcase](https://github.com/Mai961/robotics-showcase) repository's replay clips, hosted
here so visitors can download them and open them locally in Foxglove Studio.

All four clips, and the `metadata.yaml` and layout files beside them, are byte-identical copies of
the showcase repository's (main), except the whole-body layout, which here also hides
`/wholebody/goals_field` in the field 3D panel; the localizer and EKF clips carry the field and tag
scene topics and a derived `/viz/fix_points` display topic, and the whole-body clip carries the
field scene topics and `/viz/arm`.

| File | Size | Source in the showcase repository |
|---|---|---|
| `perception-sqpnp/localizer-shop-20s.mcap` | 15.7 MB | byte-identical copy of `perception-sqpnp/replay/localizer-shop-20s.mcap` |
| `state-estimation/field-ekf-match-20s.mcap` | 5.4 MB | byte-identical copy of `state-estimation/replay/field-ekf-match-20s.mcap` |
| `control-wholebody-2026/wholebody-cycle-10s.mcap` | 1.2 MB | byte-identical copy of `control/wholebody-2026/replay/wholebody-cycle-10s.mcap` |
| `udp-bridge/clock-sync-154s.mcap` | 18 KB | byte-identical copy of `udp-bridge/replay/clock-sync-154s.mcap` |

One more clip is hosted here that is not in the showcase repository:

| File | What it is |
|---|---|
| `odin-cloud-slam/odin-cloud-slam-15s.mcap` | The first 15 s of a recorded shop bag: the point cloud (every second message), odometry, transforms and localizer fixes; no camera; 22.5 MB. The point cloud is the Odin camera driver's own output. Its folder also holds the rosbag2 `metadata.yaml`, a `README.md` with the details, and `foxglove-layout.json` to import in Foxglove. |

The files are stored in plain git (no LFS), marked `binary` in `.gitattributes`.

`_headers` is only used if this repository is served by Cloudflare Pages; on GitHub Pages it is
inert. The viewer loads the clips from the R2 mirror.

## Foxglove hosting

The same files are mirrored to a Cloudflare R2 bucket so Foxglove can open them by URL; r2.dev is
Cloudflare's rate-limited development domain, enough for a few demo files. The bucket keys match
the paths under `replay/`:

- `perception-sqpnp/localizer-shop-20s.mcap`
- `state-estimation/field-ekf-match-20s.mcap`
- `control-wholebody-2026/wholebody-cycle-10s.mcap`
- `udp-bridge/clock-sync-154s.mcap`
- `odin-cloud-slam/odin-cloud-slam-15s.mcap`

The viewer buttons on the site open each clip in a hosted viewer,
https://replay-viewer-e62.pages.dev/, a deployment of Lichtblick (an open-source, MIT-licensed build
of Foxglove Studio). A viewer link follows this template, with both URLs URL-encoded:

```
https://replay-viewer-e62.pages.dev/?ds=remote-file&ds.url=<R2 URL of the .mcap>&layoutUrl=<R2 URL of the layout>
```

The layout loads from the same R2 folder as the clip: `<folder>/foxglove-layout.json`. For example,
the clip `state-estimation/field-ekf-match-20s.mcap` opens with
`state-estimation/foxglove-layout.json`.
