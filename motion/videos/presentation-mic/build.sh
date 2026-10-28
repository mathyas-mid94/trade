#!/bin/sh
# Monte la vidéo de présentation du cabinet : corps animé (voix ElevenLabs accélérée ×1,2, sans changer la hauteur) + outro MIC générique (bande-son d'origine, vitesse normale). Pas d'intro.
# usage : sh motion/videos/presentation-mic/build.sh   (supprimer .body_silent.mp4 pour refaire le rendu des images)
set -e
cd "$(dirname "$0")/../.."
OUT=videos/presentation-mic
[ -f $OUT/.body_silent.mp4 ] || node render.mjs $OUT/video.html $OUT/.body_silent.mp4 30
ffmpeg -y -loglevel error -i $OUT/.body_silent.mp4 -i $OUT/voix_script.m4a -map 0:v -map 1:a -c:v copy \
  -c:a aac -b:a 192k -ar 48000 -ac 2 -shortest $OUT/.body.mp4
ffmpeg -y -loglevel error -i $OUT/.body.mp4 -i outro/outro.mp4 \
  -filter_complex "[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1[v][a]" -map "[v]" -map "[a]" \
  -c:v libx264 -crf 20 -preset medium -pix_fmt yuv420p -c:a aac -b:a 192k $OUT/presentation-mic.mp4
rm -f $OUT/.body.mp4
echo "ok : $OUT/presentation-mic.mp4"
