# Lindisfarne — Tapestry Style · 30s HyperFrames Clip

A 30-second animated-history clip about the Viking raid on Lindisfarne (793 AD),
built the code-first way: **AI-generated PNG artwork in a hand-embroidered
tapestry / cross-stitch style, animated entirely with code** (HyperFrames +
GSAP). No AI video generation, no hand-drawn SVG cartoon scenes.

Rendered output (local): `renders/lindisfarne_tapestry_30s.mp4`
1920×1080 · 30.0 s · voice + SFX + BGM + burned-in subtitles.

## Timeline

| Time | Scene | What the code animates |
|---|---|---|
| 0.0–17.2 s | Monastery cliff (Scene 1 PNG) | Foreground longship element sails left→right across the sea with a bob/roll loop; two mirror-tiled wave strips cropped from the painting's own sea slide at different speeds (parallax); two mist strips drift in opposite directions; slow camera push-in; title card "LINDISFARNE · 793 AD" |
| 16.3–26.0 s | Viking harbour village (Scene 2 PNG) | Flipped longship element pulls away from the dock and sails out of frame, bobbing; mist drifts over the water; slow camera pull-back; crossfade in |
| 25.1–30.0 s | Stitched map of the North Sea (Scene 3 PNG) | A rust-red route line stitches itself from Norway to Lindisfarne (stroke-dashoffset draw-on); a small longship sails the route via GSAP keyframes; NORWAY / ENGLAND / NORTH SEA / LINDISFARNE labels fade in; arrival ring pulse at the island |

Narration (reused, unmodified, from the earlier 1-minute Lindisfarne project):
scene 1 voice at 2.2 s (13.56 s), scene 2 voice at 16.26 s (8.83 s) — Magnus TTS.
Subtitles are burned into the composition, timed to those two voice lines.
Audio bed: per-scene synthesized SFX (sea/wind/bells) + D-minor pad BGM.

## Files in this folder (code — stored on GitHub)

- `index.html` — the whole composition: scenes, GSAP timelines, audio clips, subtitles
- `lib/gsap.min.js`, `lib/MotionPathPlugin.min.js` — GSAP vendored locally (no CDN)
- `package.json` — pins `hyperframes@0.9.65` (`check` / `render` / `preview` scripts)
- `meta.json`, `hyperframes.json` — HyperFrames project metadata

## Assets (binary — NOT stored on GitHub)

The GitHub connector snapshot push only carries UTF-8 text, so the PNG/WAV/MP3
assets live in the local project folder `~/workspace/lindisfarne-tapestry-hf/assets/`
on the production machine:

| File | What it is | How it was made |
|---|---|---|
| `assets/scene1.png` (1920×1080) | Monastery on a cliff, 3 longships in the mist | AI image, tapestry style (BBG-approved proof still) |
| `assets/scene2.png` (1920×1080) | Viking harbour village: thatched houses, palisade, market, empty dock | AI image, same style references |
| `assets/scene3.png` (1920×1080) | Stitched map: Britain left, Norway right, island monastery in the sea | AI image, same style references |
| `assets/ship.png` / `assets/ship_flip.png` | Single cross-stitch longship element (dragon prow, red-white sail), alpha cut-out + mirrored copy | AI image on solid #00FF00, chroma-keyed with PIL (green-distance alpha + despill) |
| `assets/mist.png` | Horizontal embroidered mist band, soft alpha | AI image on solid #00FF00, soft chroma-key with PIL |
| `assets/waveA.png` / `assets/waveB.png` (3840 wide) | Wave strips cropped from scene1's sea (y 820–1010 / 950–1080), mirror-tiled so the GSAP slide loops seamlessly | PIL crop + mirror-concat |
| `assets/scene1.mp3`, `assets/scene2.mp3` | Narration lines 1–2 (Magnus) | Reused from `~/workspace/lindisfarne_1min/voice/` |
| `assets/sfx1.wav`, `assets/sfx2.wav`, `assets/bgm.wav` | Scene SFX + BGM pad | Reused from `~/workspace/lindisfarne_1min/sfx/` |

## Render it

```bash
cd lindisfarne-tapestry-hf          # local project folder with assets/ present
chmod go-w ~ ~/.cache               # environment quirk on this machine
export TMPDIR=~/workspace/.hf-tmp
export HYPERFRAMES_EXTRACT_CACHE_DIR=~/workspace/.hf-cache
npm run check                       # lint the composition
npx hyperframes snapshot --at 1.5,6,12,20,27,29.5   # eyeball frames first
npx hyperframes render --output renders/lindisfarne_tapestry_30s.mp4
```

Note: this branch is code storage only. Nothing here touches
`.github/workflows/` — the repo's existing Remotion workflow on `main`
is unrelated and is not triggered by this branch.
