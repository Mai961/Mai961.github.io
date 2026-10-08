# Replay clips

These are MCAP recordings of ROS 2 bags behind the project showcase and the [robotics
showcase](https://github.com/Mai961/robotics-showcase) repository, hosted here so visitors can
download them and open them locally in Foxglove Studio, or in the viewer linked from the site.

The whole-body and clock-sync clips, with their `metadata.yaml` and layout files, are byte-identical
copies of the showcase repository's (main). The field EKF and localizer clips cover the same 20 s of
a recorded match; they carry the field and tag scene topics, a derived `/viz/fix_points` display
topic and the blurred detection image, and are hosted here and on the R2 mirror. The whole-body clip
carries the field scene topics and `/viz/arm`.

| File | Size | Source |
|---|---|---|
| `state-estimation/field-ekf-match-20s.mcap` | 5.7 MB | bag `20260905-134217`, 66.8 s to 86.8 s; hosted here and on R2 |
| `perception-match/localizer-match-20s.mcap` | 4.5 MB | bag `20260905-134217`, 66.8 s to 86.8 s; hosted here and on R2 |
| `control-wholebody-2026/wholebody-cycle-10s.mcap` | 1.2 MB | byte-identical copy of the showcase repository's `control/wholebody-2026/replay/wholebody-cycle-10s.mcap` |
| `udp-bridge/clock-sync-154s.mcap` | 18 KB | byte-identical copy of the showcase repository's `udp-bridge/replay/clock-sync-154s.mcap` |

One more clip is hosted here that is not in the showcase repository:

| File | What it is |
|---|---|
| `odin-cloud-slam/odin-cloud-slam-20s.mcap` | The last 20 s of a recorded shop bag (18 s to 38 s): the point cloud (every third message), odometry, transforms, localizer fixes, field and tag scene topics, and the blurred detection image; 25.8 MB. The point cloud is the Odin camera driver's own output. Its folder also holds the rosbag2 `metadata.yaml`, a `README.md` with the details, and `foxglove-layout.json`. |

The files are stored in plain git (no LFS), marked `binary` in `.gitattributes`.

`_headers` is only used if this repository is served by Cloudflare Pages; on GitHub Pages it is
inert. The viewer loads the clips from the R2 mirror.

## Foxglove hosting

The same files, with their layouts, are mirrored to a Cloudflare R2 bucket so the viewer can open
them by URL; r2.dev is Cloudflare's rate-limited development domain, enough for a few demo files.
The bucket keys match the paths under `replay/`:

- `state-estimation/field-ekf-match-20s.mcap`
- `perception-match/localizer-match-20s.mcap`
- `control-wholebody-2026/wholebody-cycle-10s.mcap`
- `udp-bridge/clock-sync-154s.mcap`
- `odin-cloud-slam/odin-cloud-slam-20s.mcap`

The viewer buttons on the site open each clip in a hosted viewer,
https://replay-viewer-e62.pages.dev/, a deployment of Lichtblick (an open-source, MIT-licensed build
of Foxglove Studio). A viewer link follows this template, with both URLs URL-encoded:

```
https://replay-viewer-e62.pages.dev/?ds=remote-file&ds.url=<R2 URL of the .mcap>&layoutUrl=<R2 URL of the layout>
```

The layout loads from the same R2 folder as the clip: `<folder>/foxglove-layout.json`. For example,
the clip `state-estimation/field-ekf-match-20s.mcap` opens with
`state-estimation/foxglove-layout.json`.
