#!/bin/sh
# Monte la version longue : intro MIC (dans le blanc du début de la voix) + corps animé sur la voix + outro (version site).
# usage : sh motion/videos/assurance-vie-long/build.sh   (reprend là où il s'est arrêté si on le relance)
set -e
cd "$(dirname "$0")/../.."
OUT=videos/assurance-vie-long
# Voix : si timing.js existe, c'est la voix enregistrée sur le script (voix_script.m4a, calée par align.py) ;
# sinon, la voix d'origine (voix.m4a), dont le corps commence à 7,9 s.
if [ -f $OUT/timing.js ]; then VOIX=$OUT/voix_script.m4a; START=0; else VOIX=$OUT/voix.m4a; START=7.9; fi
MUSIQUE=$(ls $OUT/musique.* 2>/dev/null | head -1)
[ -f $OUT/.intro.mp4 ] || {
  node render.mjs "intro/intro.html?theme=assurancevie" $OUT/.intro_silent.mp4 30
  ffmpeg -y -loglevel error -i $OUT/.intro_silent.mp4 -ss 2.06 -i brand/mic-sound-reference.m4a -map 0:v -map 1:a -c:v copy \
    -af "afade=t=in:d=0.25" -c:a aac -b:a 192k -ar 48000 -ac 2 -shortest $OUT/.intro.mp4
  rm -f $OUT/.intro_silent.mp4
}
[ -f $OUT/.body_silent.mp4 ] || node render.mjs $OUT/video.html $OUT/.body_silent.mp4 30
if [ -n "$MUSIQUE" ]; then
  # musique en boucle, discrète, qui s'efface automatiquement quand la voix parle
  ffmpeg -y -loglevel error -i $OUT/.body_silent.mp4 -ss $START -i $VOIX -stream_loop -1 -i $MUSIQUE -filter_complex \
    "[1:a]aresample=48000,aformat=channel_layouts=stereo,asplit=2[v][vk];[2:a]aresample=48000,aformat=channel_layouts=stereo,volume=0.32[m];[m][vk]sidechaincompress=threshold=0.03:ratio=8:attack=40:release=600[md];[v][md]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.95[a]" \
    -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest $OUT/.body.mp4
else
  ffmpeg -y -loglevel error -i $OUT/.body_silent.mp4 -ss $START -i $VOIX -map 0:v -map 1:a -c:v copy \
    -c:a aac -b:a 192k -ar 48000 -ac 2 -shortest $OUT/.body.mp4
fi
ffmpeg -y -loglevel error -i $OUT/.intro.mp4 -i $OUT/.body.mp4 -i outro/outro.mp4 \
  -filter_complex "[0:v][0:a][1:v][1:a][2:v][2:a]concat=n=3:v=1:a=1[v][a]" -map "[v]" -map "[a]" \
  -c:v libx264 -crf 20 -preset medium -pix_fmt yuv420p -c:a aac -b:a 192k $OUT/assurance-vie-long.mp4
rm -f $OUT/.intro.mp4 $OUT/.body_silent.mp4 $OUT/.body.mp4
echo "ok : $OUT/assurance-vie-long.mp4"
