# Replay clips

These are MCAP recordings of ROS 2 bags from the
[robotics showcase](https://github.com/Mai961/robotics-showcase) repository's replay clips, hosted
here so visitors can download them and open them locally in Foxglove Studio.

The localizer, field EKF and whole-body clips are rebuilt from the same recorded windows as the
showcase repository's clips (main, commit `0c41990`). They now also carry the field and tag scene
topics for the viewer (`/viz/field`, `/viz/robot_field`, `/viz/field_base_path`, and for the
localizer and EKF clips `/viz/tag_seen` and a derived `/viz/fix_points` display topic; the
whole-body clip adds `/viz/arm`). Each of their folders holds the clip, its rosbag2
`metadata.yaml` and a `foxglove-layout.json` to import. The clock-sync clip is still a
byte-identical copy of the showcase repository's.

| File | Size | Source in the showcase repository |
|---|---|---|
| `perception-sqpnp/localizer-shop-20s.mcap` | 15.7 MB | rebuilt from `perception-sqpnp/replay/localizer-shop-20s.mcap`'s window |
| `state-estimation/field-ekf-match-20s.mcap` | 5.4 MB | rebuilt from `state-estimation/replay/field-ekf-match-20s.mcap`'s window |
| `control-wholebody-2026/wholebody-cycle-10s.mcap` | 1.2 MB | rebuilt from `control/wholebody-2026/replay/wholebody-cycle-10s.mcap`'s window |
| `udp-bridge/clock-sync-154s.mcap` | 18 KB | byte-identical copy of `udp-bridge/replay/clock-sync-154s.mcap` |

One more clip is hosted here that is not in the showcase repository:

| File | What it is |
|---|---|
| `odin-cloud-slam/odin-cloud-slam-15s.mcap` | The first 15 s of a recorded shop bag: the point cloud (every second message), odometry, transforms and localizer fixes; no camera; 22.5 MB. The point cloud is the Odin camera driver's own output. Its folder also holds the rosbag2 `metadata.yaml`, a `README.md` with the details, and `foxglove-layout.json` to import in Foxglove. |

The files are stored in plain git (no LFS), marked `binary` in `.gitattributes`.

When this repository is served by Cloudflare Pages, `_headers` adds the CORS headers Foxglove needs
to open the clips by URL.

## Foxglove hosting

The same files are mirrored to a Cloudflare R2 bucket so Foxglove can open them by URL; r2.dev is
Cloudflare's rate-limited development domain, enough for a few demo files. The bucket keys match
the paths under `replay/`:

- `perception-sqpnp/localizer-shop-20s.mcap`
- `state-estimation/field-ekf-match-20s.mcap`
- `control-wholebody-2026/wholebody-cycle-10s.mcap`
- `udp-bridge/clock-sync-154s.mcap`
- `odin-cloud-slam/odin-cloud-slam-15s.mcap`
