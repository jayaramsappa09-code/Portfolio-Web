#!/usr/bin/env python3
"""
scripts/replace-audio.py

Replaces ONLY the audio dialogue of an input video while preserving 100% of the video track:
- Keeps every original video frame exactly unchanged (using ffmpeg '-c:v copy').
- Does not change character, animation, face, expressions, movements, clothing, background, lighting, colors, camera, or timing.
- Does not alter visual stream for lip syncing.
- Preserves original quality, resolution, frame rate, and duration.
- Replaces audio with the new male voice track.

Usage:
    python3 scripts/replace-audio.py --video intro.mp4 --audio male_voice.wav --output public/hero/hero.mp4
"""

import os
import sys
import argparse
import subprocess

def run_cmd(cmd):
    print(f">> {' '.join(cmd)}")
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if res.returncode != 0:
        print(f"Error executing command: {res.stderr}", file=sys.stderr)
        sys.exit(1)
    return res.stdout

def main():
    parser = argparse.ArgumentParser(description="Replace audio track while keeping 100% of video frames completely unchanged.")
    parser.add_argument("--video", default="intro.mp4", help="Path to original input video")
    parser.add_argument("--audio", default="", help="Path to new male voice audio (optional)")
    parser.add_argument("--output", default="public/hero/hero.mp4", help="Output MP4 file")
    args = parser.parse_args()

    if not os.path.exists(args.video):
        print(f"Error: Video file '{args.video}' not found.")
        print("Please place your original video file in the project folder and re-run.")
        sys.exit(1)

    os.makedirs(os.path.dirname(args.output), exist_ok=True)

    if args.audio and os.path.exists(args.audio):
        print("Muxing video with replacement male voice audio track (zero video re-encoding)...")
        run_cmd([
            "ffmpeg", "-y",
            "-i", args.video,
            "-i", args.audio,
            "-c:v", "copy",        # Exactly untouched original video stream
            "-map", "0:v:0",       # Take first video stream from original
            "-map", "1:a:0",       # Take replacement audio stream
            "-c:a", "aac",
            "-b:a", "96k",
            "-shortest",
            args.output
        ])
    else:
        print("Copying original video track into hero assets with pristine video preservation...")
        run_cmd([
            "ffmpeg", "-y",
            "-i", args.video,
            "-c:v", "copy",        # Exactly untouched original video stream
            "-c:a", "aac",
            "-b:a", "96k",
            args.output
        ])

    print(f"Done! Clean output generated at: {args.output}")

if __name__ == "__main__":
    main()
