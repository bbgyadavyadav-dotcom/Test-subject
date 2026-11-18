#!/bin/bash
set -e
mkdir -p out
ffmpeg -y -f lavfi -i color=c=0x1a365d:s=1280x720:r=30:d=3 -f lavfi -i sine=frequency=440:duration=3 -c:v libx264 -pix_fmt yuv420p -c:a aac -shortest out/tiny-test.mp4
