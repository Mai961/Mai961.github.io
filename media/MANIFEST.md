# Media manifest: capture checklist

Every clip and poster on the site is a slot: the pages already point at the file names below.
Until a file exists, its page shows the shared placeholder (`media/posters/placeholder.svg`). Fill a
slot by dropping the file in at exactly the listed path.

The links to the robotics showcase (`https://github.com/Mai961/robotics-showcase/...`) only work for
visitors once that repository is public.

## Encoding spec (all six clips)

- Container and codec: MP4, H.264 (`libx264`), pixel format `yuv420p`, no audio track.
- Size: 1280×720 (or 1920×1080), 30 fps, at most 8 MB.
- Length: 10–25 s. Anything longer goes to an unlisted YouTube video instead of this repository,
  linked from the project page's Links section.
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

### 1. Shoot on the move

- Page: `projects/shoot-on-the-move.html`
- Clip: `media/clips/shoot-on-the-move.mp4`
- Poster: `media/posters/shoot-on-the-move.jpg`
- Target length: 10–25 s
- Shows: the robot shooting while it drives. The turret holds its aim while the chassis moves and
  turns; at least one ball leaves while the robot is moving.
- Privacy: bumpers and the background are the usual leaks here (team number, event signage, people).

```sh
ffmpeg -ss START -t LENGTH -i INPUT.mp4 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p" -c:v libx264 -preset slow -crf 23 -maxrate 2.2M -bufsize 4.4M -an -map_metadata -1 -map_metadata:s:v -1 -map_chapters -1 -movflags +faststart media/clips/shoot-on-the-move.mp4
ffmpeg -ss 2 -i media/clips/shoot-on-the-move.mp4 -frames:v 1 -update 1 -q:v 3 media/posters/shoot-on-the-move.jpg
```

- [ ] clip
- [ ] poster
- [ ] privacy checklist

### 2. Whole-body arm control

- Page: `projects/arm-placing-objects.html`
- Clip: `media/clips/arm-placing-objects.mp4`
- Poster: `media/posters/arm-placing-objects.jpg`
- Target length: 10–25 s
- Shows: the robot driving to its staging pose, then the arm reaching its goal. One or two full
  cycles: drive in, approach, reach its goal, retract.
- Privacy: bumpers, people in the background.

```sh
ffmpeg -ss START -t LENGTH -i INPUT.mp4 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p" -c:v libx264 -preset slow -crf 23 -maxrate 2.2M -bufsize 4.4M -an -map_metadata -1 -map_metadata:s:v -1 -map_chapters -1 -movflags +faststart media/clips/arm-placing-objects.mp4
ffmpeg -ss 2 -i media/clips/arm-placing-objects.mp4 -frames:v 1 -update 1 -q:v 3 media/posters/arm-placing-objects.jpg
```

- [ ] clip
- [ ] poster
- [ ] privacy checklist

### 3. Reaching a field-fixed goal from AprilTag localization

- Page: `projects/arm-tracking-an-apriltag.html`
- Clip: `media/clips/arm-tracking-an-apriltag.mp4`
- Poster: `media/posters/arm-tracking-an-apriltag.jpg`
- Target length: 10–25 s
- Shows: the robot approaches, the tags give its field pose, and the arm reaches its goal. I intend
  to record the arm tracking a moving tag. I will rename this page back to 'Arm tracking an
  AprilTag' only after the showcase README describes the mechanism.
- Privacy: bumpers, people holding the tag (faces), the room around the bench.

```sh
ffmpeg -ss START -t LENGTH -i INPUT.mp4 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p" -c:v libx264 -preset slow -crf 23 -maxrate 2.2M -bufsize 4.4M -an -map_metadata -1 -map_metadata:s:v -1 -map_chapters -1 -movflags +faststart media/clips/arm-tracking-an-apriltag.mp4
ffmpeg -ss 2 -i media/clips/arm-tracking-an-apriltag.mp4 -frames:v 1 -update 1 -q:v 3 media/posters/arm-tracking-an-apriltag.jpg
```

- [ ] clip
- [ ] poster
- [ ] privacy checklist

### 4. Auto-tuning routine

- Page: `projects/auto-tuning-routine.html`
- Clip: `media/clips/auto-tuning-routine.mp4`
- Poster: `media/posters/auto-tuning-routine.jpg`
- Target length: 10–25 s
- Shows: the auto-tuning routine on the test bench: the arm joint running its episodes, ideally
  next to the telemetry plot or the agent's directives as they are sent.
- Privacy: if a terminal or dashboard is in frame, it is a screen recording: crop the window
  chrome and check prompts, hostnames and paths.

```sh
ffmpeg -ss START -t LENGTH -i INPUT.mp4 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p" -c:v libx264 -preset slow -crf 23 -maxrate 2.2M -bufsize 4.4M -an -map_metadata -1 -map_metadata:s:v -1 -map_chapters -1 -movflags +faststart media/clips/auto-tuning-routine.mp4
ffmpeg -ss 2 -i media/clips/auto-tuning-routine.mp4 -frames:v 1 -update 1 -q:v 3 media/posters/auto-tuning-routine.jpg
```

- [ ] clip
- [ ] poster
- [ ] privacy checklist

### 5. Vision replay: a recorded match

- Page: `projects/vision-replay-match.html`
- Clip: `media/clips/vision-replay-match.mp4`
- Poster: `media/posters/vision-replay-match.jpg`
- Target length: 10–25 s
- Shows: a replay of a recorded match, rendered from a ROS 2 bag: the camera image with the tag
  detections and the estimated field pose overlaid.
- Privacy: the camera sees other robots and the venue. Crop or blur readable team numbers on
  bumpers, event signage and audience faces. No window chrome, topic list or terminal in frame.

```sh
ffmpeg -ss START -t LENGTH -i INPUT.mp4 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p" -c:v libx264 -preset slow -crf 23 -maxrate 2.2M -bufsize 4.4M -an -map_metadata -1 -map_metadata:s:v -1 -map_chapters -1 -movflags +faststart media/clips/vision-replay-match.mp4
ffmpeg -ss 2 -i media/clips/vision-replay-match.mp4 -frames:v 1 -update 1 -q:v 3 media/posters/vision-replay-match.jpg
```

- [ ] clip
- [ ] poster
- [ ] privacy checklist

### 6. Vision replay: the camera's image stream

- Page: `projects/vision-replay-camera-stream.html`
- Clip: `media/clips/vision-replay-camera-stream.mp4`
- Poster: `media/posters/vision-replay-camera-stream.jpg`
- Target length: 10–25 s
- Shows: a replay of the Odin camera's recorded image stream through the localizer, rendered
  from a ROS 2 bag: the image with the accepted tags and the resulting pose.
- Privacy: check what the camera saw (people, screens, whiteboards). No window chrome, topic list
  or terminal in frame.

```sh
ffmpeg -ss START -t LENGTH -i INPUT.mp4 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p" -c:v libx264 -preset slow -crf 23 -maxrate 2.2M -bufsize 4.4M -an -map_metadata -1 -map_metadata:s:v -1 -map_chapters -1 -movflags +faststart media/clips/vision-replay-camera-stream.mp4
ffmpeg -ss 2 -i media/clips/vision-replay-camera-stream.mp4 -frames:v 1 -update 1 -q:v 3 media/posters/vision-replay-camera-stream.jpg
```

- [ ] clip
- [ ] poster
- [ ] privacy checklist
