# Media manifest: capture checklist

Every clip and poster on the site is a slot: `index.html` already points at the file names below.
Until a file exists, its showcase shows the shared placeholder (`media/posters/placeholder.svg`).
Fill a slot by dropping the file in at exactly the listed path.

The links to the robotics showcase (`https://github.com/Mai961/robotics-showcase/...`) only work for
visitors once that repository is public.

## Encoding spec (all clips)

- Container and codec: MP4, H.264 (`libx264`), pixel format `yuv420p`, no audio track.
- Size: 1280×720 (or 1920×1080), 30 fps, at most 8 MB.
- Length: 10–25 s. Anything longer goes to an unlisted YouTube video instead of this repository,
  linked from the showcase's Details line.
- `-movflags +faststart` so the clip starts before it has fully downloaded.
- `-map_metadata -1` clears the file-level metadata (phone GPS, creation time, title),
  `-map_metadata:s:v -1` the video track's own tags (its creation time and the recording device's
  handler name), and `-map_chapters -1` the chapter titles. Every MP4 still carries a few generic
  tags that ffmpeg writes itself; the checklist below lists them.
- Poster: one JPEG frame from the clip, same size as the clip, ideally under 150 KB.

Each block below has its two commands with the paths filled in. Replace `INPUT.mp4` with the source
file, and `START` and `LENGTH` with where the take starts and how many seconds to keep (for example
`-ss 00:00:04 -t 20`). For 1920×1080, replace both `1280:720` with `1920:1080`. The `-maxrate` cap
keeps a 25 s clip under 8 MB at either size; check with `ls -l` anyway. For a screen recording, crop
the window chrome first by putting `crop=W:H:X:Y,` at the start of the `-vf` filter (width, height,
and the top-left corner of the area to keep, in source pixels).

To hide a team number, a logo or a face, put `drawbox=x=X:y=Y:w=W:h=H:color=black:t=fill,` at the
start of the `-vf` filter (the box's top-left corner and size, in source pixels, before `scale`). It
blacks out that rectangle for the whole clip, so it suits a fixed camera. Otherwise use `crop=` to
frame the number out, or pick another take.

To blur the same box instead of blacking it out, put
`split[a][b];[b]crop=W:H:X:Y,gblur=sigma=20[c];[a][c]overlay=X:Y,` at the start of the `-vf` filter,
before `scale` (same source-pixel box: size W×H, top-left corner X,Y).

An empty slot's `<video>` in `index.html` uses the shared placeholder as its poster
(`poster="media/posters/placeholder.svg"`); Chrome paints a grey box over the CSS placeholder when a
video has no poster at all. When you add a slot's poster file, change that attribute to
`poster="media/posters/<slug>.jpg"`.

## Privacy checklist (every clip and poster)

- [ ] No identifiable faces without consent (minors never). When in doubt, crop, blur, or pick
      another take.
- [ ] No readable team number: bumpers, banners, shirts, laptop stickers, including other robots'
      numbers.
- [ ] No team name, logo or mascot (shirts, banners, robot panels).
- [ ] No school name or uniform crest.
- [ ] No event names, venue signage or sponsor banners in frame.
- [ ] Screen recordings: no hostnames, IP addresses, usernames, window titles, terminal prompts
      or file paths. Crop the window chrome; render bag replays without the window around them.
- [ ] Screen recordings: no browser tabs, notification pop-ups, taskbar user name or clock.
- [ ] No other people's names on screen (chat, dashboards, git logs).
- [ ] Metadata stripped (the clip command does this).
- [ ] `ffprobe -hide_banner -show_entries format_tags:stream_tags media/clips/<slug>.mp4` prints no
      tags beyond the generic ones every encode gets: `major_brand`, `minor_version`,
      `compatible_brands` and `encoder` on the file; `language=und`, `handler_name=VideoHandler` and
      `encoder` on the video track. No `creation_time`, `location`, `title` or device name.
- [ ] Longer than 25 s or over 8 MB: unlisted YouTube link instead of a file here.

## Clip slots

### 1. Replay of a recorded match

- Section: `index.html#vision`
- Clip: `media/clips/vision-replay-match.mp4`
- Poster: `media/posters/vision-replay-match.jpg`
- Target length: 10–25 s
- Status: filled. The clip is 20 s, 1280×720, 0.9 MB; the poster is 1280×720.
- Shows: 20 s of a recorded match: the localizer's debug image beside the estimated field pose and
  each tag fix.
- How it was made: Rendered offline from a recorded ROS 2 bag with a Python script: left, the
  localizer's own debug image (about 3 Hz, each frame held until the next); right, the fused field
  pose at 400 Hz drawn as a path with each tag fix as a fading marker. The camera scene is
  Gaussian-blurred because a readable team number was visible on arena banners; the tag boxes and
  overlay are untouched. To replace it with an unblurred render, drop in a new file with the same
  name.
- Privacy: the camera sees other robots and the venue. Crop or blur readable team numbers on
  bumpers, event signage and audience faces. No window chrome, topic list or terminal in frame.

```sh
ffmpeg -ss START -t LENGTH -i INPUT.mp4 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p" -c:v libx264 -preset slow -crf 23 -maxrate 2.2M -bufsize 4.4M -an -map_metadata -1 -map_metadata:s:v -1 -map_chapters -1 -movflags +faststart media/clips/vision-replay-match.mp4
ffmpeg -ss 2 -i media/clips/vision-replay-match.mp4 -frames:v 1 -update 1 -q:v 3 media/posters/vision-replay-match.jpg
```

- [x] clip
- [x] poster
- [ ] privacy checklist

### 2. Point cloud over the field

- Section: `index.html#vision`
- Clip: `media/clips/vision-pointcloud-localizer.mp4`
- Poster: `media/posters/vision-pointcloud-localizer.jpg`
- Target length: 10–25 s
- Status: filled. The clip is 13.3 s (the whole recording), 1280×720, 3.0 MB; the poster is
  1280×720.
- Shows: a screen recording of the 3D view, with the Odin camera driver's point cloud and the
  field's tag markers, beside the camera image with the localizer's detections.
- How it was made: screen recording by me, encoded with ffmpeg: scaled to 1280 wide and padded to
  1280×720, no crop needed (the capture shows no window chrome, taskbar or clock). In the camera
  image, background robots' bumper numbers and the face of a person standing at a laptop table
  are Gaussian-blurred with time-gated boxes.
- Privacy: a screen recording. Crop the window chrome and check panel titles, the topic list and
  everything the camera saw.

```sh
ffmpeg -ss START -t LENGTH -i INPUT.mp4 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p" -c:v libx264 -preset slow -crf 23 -maxrate 2.2M -bufsize 4.4M -an -map_metadata -1 -map_metadata:s:v -1 -map_chapters -1 -movflags +faststart media/clips/vision-pointcloud-localizer.mp4
ffmpeg -ss 2 -i media/clips/vision-pointcloud-localizer.mp4 -frames:v 1 -update 1 -q:v 3 media/posters/vision-pointcloud-localizer.jpg
```

- [x] clip
- [x] poster
- [ ] privacy checklist

### 3. Shoot on the move

- Section: `index.html#shoot-on-the-move`
- Clip: `media/clips/shoot-on-the-move.mp4`
- Poster: `media/posters/shoot-on-the-move.jpg`
- Target length: 10–25 s
- Status: filled. The clip is 15.2 s, 1280×720, 2.9 MB.
- Shows: the robot shooting while it drives. The turret holds its aim while the chassis moves and
  turns; at least one ball leaves while the robot is moving.
- How it was made: recorded by me; encoded with ffmpeg.
- Privacy: bumpers and the background are the usual leaks here (team number, event signage, people).
- Privacy findings, for me to decide: readable team numbers on the shooting robot's blue bumper and
  on a red bumper at the left edge; two people far in the background (faces too small to
  identify); laptop screens without readable text. Nothing was blurred.

```sh
ffmpeg -ss START -t LENGTH -i INPUT.mp4 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p" -c:v libx264 -preset slow -crf 23 -maxrate 2.2M -bufsize 4.4M -an -map_metadata -1 -map_metadata:s:v -1 -map_chapters -1 -movflags +faststart media/clips/shoot-on-the-move.mp4
ffmpeg -ss 2 -i media/clips/shoot-on-the-move.mp4 -frames:v 1 -update 1 -q:v 3 media/posters/shoot-on-the-move.jpg
```

- [x] clip
- [x] poster
- [x] privacy checklist

Decision: the team numbers on the bumpers stay visible as recorded (reviewed, left on purpose).

### 4. Whole-body arm control

- Section: `index.html#whole-body-control`
- Clip: `media/clips/arm-placing-objects.mp4`
- Poster: `media/posters/arm-placing-objects.jpg`
- Target length: 10–25 s
- Status: filled. The clip is 8.1 s, 1280×720, 1.2 MB: two portrait recordings, pillarboxed and
  joined.
- Shows: the robot driving to its staging pose, then the arm reaching its goal. One or two full
  cycles: drive in, approach, reach its goal, retract.
- How it was made: recorded by me; encoded with ffmpeg (both recordings encoded identically, then
  joined with the concat filter).
- Privacy: bumpers, people in the background.
- Privacy findings, for me to decide: no people, no bumpers and no readable text beyond an exit
  sign. Nothing was blurred.

```sh
ffmpeg -ss START -t LENGTH -i INPUT.mp4 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p" -c:v libx264 -preset slow -crf 23 -maxrate 2.2M -bufsize 4.4M -an -map_metadata -1 -map_metadata:s:v -1 -map_chapters -1 -movflags +faststart media/clips/arm-placing-objects.mp4
ffmpeg -ss 2 -i media/clips/arm-placing-objects.mp4 -frames:v 1 -update 1 -q:v 3 media/posters/arm-placing-objects.jpg
```

- [x] clip
- [x] poster
- [ ] privacy checklist

### 5. Replay in the viewer (whole-body)

- Section: `index.html#whole-body-control`
- Clip: `media/clips/wholebody-layout.mp4`
- Poster: `media/posters/wholebody-layout.jpg`
- Target length: 10–25 s
- Status: filled. The clip is 10.0 s, 1280×720, 0.7 MB; the poster is 1280×720.
- Shows: the whole-body cycle (shop session) replayed in the viewer: joint references against
  measurements, the phase events, the arm and the robot on the field.
- How it was made: screen recording of the viewer layout playing the replay clip, encoded with
  ffmpeg.
- Privacy: a screen recording. Check panel titles, the topic list and the playback clock; crop the
  window chrome.

```sh
ffmpeg -ss START -t LENGTH -i INPUT.mp4 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p" -c:v libx264 -preset slow -crf 23 -maxrate 2.2M -bufsize 4.4M -an -map_metadata -1 -map_metadata:s:v -1 -map_chapters -1 -movflags +faststart media/clips/wholebody-layout.mp4
ffmpeg -ss 2 -i media/clips/wholebody-layout.mp4 -frames:v 1 -update 1 -q:v 3 media/posters/wholebody-layout.jpg
```

- [x] clip
- [x] poster
- [ ] privacy checklist

### 6. Reaching a field-fixed goal from AprilTag localization

- Section: `index.html#whole-body-control`
- Clip: `media/clips/arm-tracking-an-apriltag.mp4`
- Poster: `media/posters/arm-tracking-an-apriltag.jpg`
- Target length: 10–25 s
- Status: filled. The clip is 13.1 s, 1280×720, 2.2 MB: a portrait HDR recording, tone-mapped to
  SDR and pillarboxed.
- Shows: the arm following an AprilTag held at the end of a stick. The showcase text covers the
  field-fixed goal; this demo mode is not excerpted in the showcase repository. I will rename this
  showcase back to 'Arm tracking an AprilTag' only after the showcase README describes the
  mechanism.
- How it was made: recorded by me; encoded with ffmpeg.
- Privacy: bumpers, people holding the tag (faces), the room around the bench.
- Privacy findings, for me to decide: no people in frame (the stick's holder is outside it), no
  bumpers; the only text is a battery label and a caliper scale. Nothing was blurred.

```sh
ffmpeg -ss START -t LENGTH -i INPUT.mp4 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p" -c:v libx264 -preset slow -crf 23 -maxrate 2.2M -bufsize 4.4M -an -map_metadata -1 -map_metadata:s:v -1 -map_chapters -1 -movflags +faststart media/clips/arm-tracking-an-apriltag.mp4
ffmpeg -ss 2 -i media/clips/arm-tracking-an-apriltag.mp4 -frames:v 1 -update 1 -q:v 3 media/posters/arm-tracking-an-apriltag.jpg
```

- [x] clip
- [x] poster
- [ ] privacy checklist

### 7. Auto-tuning routine

- Section: `index.html#auto-tuning`
- Clip: `media/clips/auto-tuning-routine.mp4`
- Poster: `media/posters/auto-tuning-routine.jpg`
- Target length: 10–25 s
- Status: filled. The clip is 5.1 s, 1280×720, 0.4 MB: a portrait recording, pillarboxed.
- Shows: the auto-tuning routine moving the robot's arm, with a laptop and a tablet in the
  foreground.
- How it was made: recorded by me; encoded with ffmpeg.
- Privacy: if a terminal or dashboard is in frame, it is a screen recording: crop the window
  chrome and check prompts, hostnames and paths.
- Privacy findings, for me to decide: no people; the laptop and tablet screens show no readable
  text (the tablet shows app icons). Nothing was blurred.

```sh
ffmpeg -ss START -t LENGTH -i INPUT.mp4 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p" -c:v libx264 -preset slow -crf 23 -maxrate 2.2M -bufsize 4.4M -an -map_metadata -1 -map_metadata:s:v -1 -map_chapters -1 -movflags +faststart media/clips/auto-tuning-routine.mp4
ffmpeg -ss 2 -i media/clips/auto-tuning-routine.mp4 -frames:v 1 -update 1 -q:v 3 media/posters/auto-tuning-routine.jpg
```

- [x] clip
- [x] poster
- [ ] privacy checklist
