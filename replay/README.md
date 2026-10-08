# Replay clips

These are byte-identical copies of the replay clips in the [robotics
showcase](https://github.com/Mai961/robotics-showcase) repository (main, commit `0c41990`). They are
hosted here so visitors can download them and open them locally in Foxglove Studio. Each file is an
MCAP recording of a ROS 2 bag. The showcase repository is the source of truth: when a clip changes
there, copy it here again unchanged.

| File | Copied from (showcase repository) |
|---|---|
| `perception-sqpnp/localizer-shop-20s.mcap` | `perception-sqpnp/replay/localizer-shop-20s.mcap` |
| `state-estimation/field-ekf-match-20s.mcap` | `state-estimation/replay/field-ekf-match-20s.mcap` |
| `control-wholebody-2026/wholebody-cycle-10s.mcap` | `control/wholebody-2026/replay/wholebody-cycle-10s.mcap` |
| `udp-bridge/clock-sync-154s.mcap` | `udp-bridge/replay/clock-sync-154s.mcap` |

One more clip is hosted here that is not in the showcase repository:

| File | What it is |
|---|---|
| `odin-cloud-slam/odin-cloud-slam-15s.mcap` | The first 15 s of a recorded shop bag: the point cloud (every second message), odometry, transforms and localizer fixes; no camera; 22.5 MB. The point cloud is the Odin camera driver's own output. Its folder also holds the rosbag2 `metadata.yaml`, a `README.md` with the details, and `foxglove-layout.json` to import in Foxglove. |

The files are stored in plain git (no LFS), marked `binary` in `.gitattributes`.

When this repository is served by Cloudflare Pages, `_headers` adds the CORS headers Foxglove needs
to open the clips by URL.
