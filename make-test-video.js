// make-test-video.js — written by Muse for BBG
// Renders a 3-second 1280x720 test video with ffmpeg:
// blue title card + 440Hz tone, then verifies it with ffprobe.
const { execFileSync } = require("child_process");
const fs = require("fs");

fs.mkdirSync("out", { recursive: true });

execFileSync("ffmpeg", [
  "-y",
  "-f", "lavfi", "-i", "color=c=0x1a365d:s=1280x720:r=30:d=3",
  "-f", "lavfi", "-i", "sine=frequency=440:duration=3",
  "-vf", "drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:text='Muse Actions Test':fontcolor=white:fontsize=48:x=(w-text_w)/2:y=(h-text_h)/2",
  "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac",
  "-shortest", "out/tiny-test.mp4",
], { stdio: "inherit" });

const info = execFileSync("ffprobe", [
  "-v", "error", "-show_entries", "format=duration,size",
  "-of", "default=noprint_wrappers=1", "out/tiny-test.mp4",
], { encoding: "utf8" });

console.log("Rendered out/tiny-test.mp4");
console.log(info);
