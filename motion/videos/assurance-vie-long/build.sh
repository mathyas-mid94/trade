#!/bin/sh
# Monte la version longue : intro MIC (dans le blanc du début de la voix) + corps animé sur la voix + outro (version site).
# usage : sh motion/videos/assurance-vie-long/build.sh   (reprend là où il s'est arrêté si on le relance)
set -e
cd "$(dirname "$0")/../.."
OUT=videos/assurance-vie-long
START=7.9   # le corps commence à 7,9 s dans la voix (avant : silence, place de l'intro)
[ -f $OUT/.intro.mp4 ] || {
  node render.mjs "intro/intro.html?theme=assurancevie" $OUT/.intro_silent.mp4 30
  ffmpeg -y -loglevel error -i $OUT/.intro_silent.mp4 -ss 2.06 -i brand/mic-sound-reference.m4a -map 0:v -map 1:a -c:v copy \
    -af "afade=t=in:d=0.25" -c:a aac -b:a 192k -ar 48000 -ac 2 -shortest $OUT/.intro.mp4
  rm -f $OUT/.intro_silent.mp4
}
[ -f $OUT/.body_silent.mp4 ] || node render.mjs $OUT/video.html $OUT/.body_silent.mp4 30
ffmpeg -y -loglevel error -i $OUT/.body_silent.mp4 -ss $START -i $OUT/voix.m4a -map 0:v -map 1:a -c:v copy \
  -c:a aac -b:a 192k -ar 48000 -ac 2 -shortest $OUT/.body.mp4
ffmpeg -y -loglevel error -i $OUT/.intro.mp4 -i $OUT/.body.mp4 -i outro/outro.mp4 \
  -filter_complex "[0:v][0:a][1:v][1:a][2:v][2:a]concat=n=3:v=1:a=1[v][a]" -map "[v]" -map "[a]" \
  -c:v libx264 -crf 20 -preset medium -pix_fmt yuv420p -c:a aac -b:a 192k $OUT/assurance-vie-long.mp4
rm -f $OUT/.intro.mp4 $OUT/.body_silent.mp4 $OUT/.body.mp4
echo "ok : $OUT/assurance-vie-long.mp4"
