#!/usr/bin/env python3
"""
scripts/build-hero-assets.py

Processes the source intro video into seamless looping hero video assets (hero.mp4 and hero.webm),
along with the portrait bust still and open-graph card.

Pipeline:
1. Detect/crop the person centred head-to-toe (768px wide, 768:960 aspect).
2. Whiten the off-white studio background with colorlevels.
3. Seamless loop cross-fading the last 0.5s into the first 0.5s (video xfade + sample-accurate audio crossfade).
4. Export:
   - public/hero/hero.webm (VP9, CRF 36, Opus 80k)
   - public/hero/hero.mp4 (H.264 yuv420p, CRF 24, AAC 96k, +faststart)
5. Export stills:
   - public/portrait-bust.webp (480x600 head-to-shirt crop)
   - public/og.jpg (1200x630 OG social preview)
"""

import os
import sys
import argparse
import subprocess
import wave
import struct

def run(cmd):
    print(f">> {' '.join(cmd)}")
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if res.returncode != 0:
        print(f"Error executing command: {res.stderr}", file=sys.stderr)
        raise RuntimeError(res.stderr)
    return res.stdout

def crossfade_audio_wav(input_wav, output_wav, loop_duration=10.0, fade_duration=0.5):
    """
    Sample-accurate crossfade of audio in pure python / wave,
    fading the tail (loop_duration - fade_duration to loop_duration)
    into the head (0 to fade_duration).
    """
    with wave.open(input_wav, 'rb') as w:
        nchannels = w.getnchannels()
        sampwidth = w.getsampwidth()
        framerate = w.getframerate()
        nframes = w.getnframes()
        raw_frames = w.readframes(nframes)

    fmt = "<" + ("h" if sampwidth == 2 else "i") * (nchannels * nframes)
    samples = list(struct.unpack(fmt, raw_frames))

    total_samples = int(loop_duration * framerate)
    fade_samples = int(fade_duration * framerate)

    if len(samples) // nchannels < total_samples:
        total_samples = len(samples) // nchannels

    # Main output length is total_samples - fade_samples
    out_length = total_samples - fade_samples
    out_samples = [0] * (out_length * nchannels)

    # Copy initial region up to out_length
    for i in range(out_length * nchannels):
        out_samples[i] = samples[i]

    # Crossfade head with tail
    for f in range(fade_samples):
        alpha = f / float(fade_samples)  # 0 -> 1
        tail_idx = (out_length + f) * nchannels
        head_idx = f * nchannels
        for c in range(nchannels):
            if tail_idx + c < len(samples):
                tail_val = samples[tail_idx + c]
                head_val = samples[head_idx + c]
                blended = int((1.0 - alpha) * tail_val + alpha * head_val)
                out_samples[head_idx + c] = blended

    out_raw = struct.pack("<" + ("h" if sampwidth == 2 else "i") * len(out_samples), *out_samples)
    with wave.open(output_wav, 'wb') as w:
        w.setnchannels(nchannels)
        w.setsampwidth(sampwidth)
        w.setframerate(framerate)
        w.writeframes(out_raw)

def main():
    parser = argparse.ArgumentParser(description="Build hero video assets")
    parser.add_argument("--input", default="intro.mp4", help="Input video file path")
    parser.add_argument("--crop-x", default="560", help="Crop x coordinate (default 560)")
    parser.add_argument("--crop-y", default="80", help="Crop y coordinate (default 80)")
    parser.add_argument("--crop-w", default="800", help="Crop width (default 800)")
    parser.add_argument("--crop-h", default="1000", help="Crop height (default 1000)")
    parser.add_argument("--duration", type=float, default=9.5, help="Loop duration in seconds (default 9.5)")
    parser.add_argument("--fade", type=float, default=0.5, help="Crossfade duration in seconds (default 0.5)")
    args = parser.parse_args()

    os.makedirs("public/hero", exist_ok=True)
    os.makedirs("public/logos", exist_ok=True)

    if not os.path.exists(args.input):
        print(f"Input file '{args.input}' not found. Please provide path to intro video.")
        sys.exit(1)

    print("Step 1: Extract audio and generate sample-accurate crossfade...")
    run(["ffmpeg", "-y", "-i", args.input, "-vn", "-ar", "44100", "-ac", "2", "/tmp/hero_raw.wav"])
    crossfade_audio_wav("/tmp/hero_raw.wav", "/tmp/hero_loop.wav", loop_duration=args.duration, fade_duration=args.fade)

    print("Step 2: Crop, whiten background, and crossfade video stream...")
    # xfade video filter
    vf_filter = (
        f"crop={args.crop_w}:{args.crop_h}:{args.crop_x}:{args.crop_y},"
        f"scale=768:960,"
        f"colorlevels=rimax=0.98:gimax=0.98:bimax=0.98"
    )
    # create trimmed clip
    run(["ffmpeg", "-y", "-i", args.input, "-t", str(args.duration), "-vf", vf_filter, "/tmp/hero_trim.mp4"])
    
    # xfade tail into head
    offset = args.duration - args.fade
    run([
        "ffmpeg", "-y",
        "-i", "/tmp/hero_trim.mp4",
        "-i", "/tmp/hero_trim.mp4",
        "-filter_complex", f"[0:v][1:v]xfade=transition=fade:duration={args.fade}:offset={offset}[v]",
        "-map", "[v]",
        "-t", str(offset),
        "/tmp/hero_video_loop.mp4"
    ])

    print("Step 3: Mux into hero.webm (VP9) and hero.mp4 (H.264)...")
    # Export WebM
    run([
        "ffmpeg", "-y",
        "-i", "/tmp/hero_video_loop.mp4",
        "-i", "/tmp/hero_loop.wav",
        "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0",
        "-c:a", "libopus", "-b:a", "80k",
        "-shortest",
        "public/hero/hero.webm"
    ])

    # Export MP4
    run([
        "ffmpeg", "-y",
        "-i", "/tmp/hero_video_loop.mp4",
        "-i", "/tmp/hero_loop.wav",
        "-c:v", "libx264", "-crf", "24", "-preset", "slow", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "96k",
        "-movflags", "+faststart",
        "-shortest",
        "public/hero/hero.mp4"
    ])

    print("Step 4: Generate portrait-bust.webp and og.jpg...")
    run([
        "ffmpeg", "-y",
        "-i", "public/hero/hero.mp4",
        "-vframes", "1",
        "-vf", "crop=480:600:(in_w-480)/2:60,scale=480:600",
        "public/portrait-bust.webp"
    ])

    print("Pipeline completed successfully!")

if __name__ == "__main__":
    main()
