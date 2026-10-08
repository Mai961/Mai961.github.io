# Replay clips

These are byte-identical copies of the replay clips in the
[robotics showcase](https://github.com/Mai961/robotics-showcase) repository (main, commit
`0c41990`). They are hosted here so that Foxglove can open them by URL. Each file is an MCAP
recording of a ROS 2 bag. The showcase repository is the source of truth: when a clip changes
there, copy it here again unchanged.

| File | Copied from (showcase repository) |
|---|---|
| `perception-sqpnp/localizer-shop-20s.mcap` | `perception-sqpnp/replay/localizer-shop-20s.mcap` |
| `state-estimation/field-ekf-match-20s.mcap` | `state-estimation/replay/field-ekf-match-20s.mcap` |
| `control-wholebody-2026/wholebody-cycle-10s.mcap` | `control/wholebody-2026/replay/wholebody-cycle-10s.mcap` |
| `udp-bridge/clock-sync-154s.mcap` | `udp-bridge/replay/clock-sync-154s.mcap` |

The files are stored in plain git (no LFS), marked `binary` in `.gitattributes`.
