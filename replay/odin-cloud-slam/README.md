# odin-cloud-slam: 15 s of the Odin camera's SLAM point cloud

`odin-cloud-slam-15s.mcap` (with its rosbag2 `metadata.yaml`) holds the first 15 s of the recorded
bag `20260801-151119` (0.0 s to 15.0 s after the bag's start), renamed: 1,384 messages, 22.5 MB.
The point cloud is the Odin camera driver's own output (`/odin1/cloud_slam`), not something this
project computes.

| Topic | Type | Messages | Content |
|---|---|---|---|
| `/odin1/cloud_slam` | `sensor_msgs/PointCloud2` | 76 | The driver's SLAM cloud in frame `odom`: 24,000 to 33,000 points each (median 27,000), fields x, y, z and packed rgb. **Thinned:** every second message is kept (about 5 of the recorded 10 per second) |
| `/odin1/odometry` | `nav_msgs/Odometry` | 152 | The driver's odometry, `odom` to `odin1_base_link`, 10 Hz |
| `/tf` | `tf2_msgs/TFMessage` | 1,081 | `field` to `odom`, `odom` to `base`, `field` to `odin_camera_measured` |
| `/tf_static` | `tf2_msgs/TFMessage` | 1 | `base` to `odin_camera` |
| `/odin_apriltag_localizer/tag_pose` | `geometry_msgs/PoseStamped` | 37 | AprilTag localizer fixes, frame `field` |
| `/odin_apriltag_localizer/field_odom` | `geometry_msgs/PoseStamped` | 37 | A second field-frame pose the localizer publishes with each fix (same stamps as `tag_pose`) |

What was changed:

- Thinning: only the point cloud, every second message, to fit a 25 MB budget for the web. All 15 s
  at the full cloud rate would be 44.7 MB at this compression (57.3 MB at zstd's default level).
- No camera topic is included. The raw camera frames in this window show a person whose face can be
  recognized, and adding them blurred would not fit the budget (42.1 MB with the thinned cloud).
- Compression: zstd level 19 in 8 MiB chunks, comparable to rosbag2's `zstd_small` storage
  preset. The compression is lossless; every included message is byte-for-byte as recorded.
- `/rosout` and `/parameter_events` are not included.

Open it with `ros2 bag play <this folder>` (ROS 2 Jazzy reads MCAP out of the box), or open the
`.mcap` in Foxglove Studio and import `foxglove-layout.json`: a 3D panel with display frame `odom`,
the cloud colored by its rgb field, and the odometry pose.
