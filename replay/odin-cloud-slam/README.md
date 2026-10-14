# odin-cloud-slam: 20 s of the Odin camera's SLAM point cloud

`odin-cloud-slam-20s.mcap` (with its rosbag2 `metadata.yaml`) holds the first 20 s of the recorded
shop bag `20260801-151119` (0–20 s after the bag's start): 4,519 messages, 25.6 MB. The recorded
path is cropped to the clip window.

- `/odin1/cloud_slam`: the SLAM point cloud, every third message.
- `/odin1/odometry`, `/tf` and `/tf_static`: odometry and transforms.
- `/odin_apriltag_localizer/tag_pose` and `/odin_apriltag_localizer/field_odom`: localizer fixes.
- `/viz/field`, `/viz/tag_seen`, `/viz/field_base_path` and related display topics: the field and
  tag scene.
- `/odin_apriltag_localizer/debug_image/compressed`: the detection image, blurred.

The point cloud is the Odin camera driver's own output, not something this project computes.

Open it in the viewer from the replay page, or open the `.mcap` in Foxglove Studio and import
`foxglove-layout.json` (a single 3D panel over the field).
