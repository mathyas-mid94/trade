#!/bin/sh
# Monte « Le Girardin industriel » : intro MIC (thème défiscalisation) + corps animé + outro (défiscalisation, version site).
# Sans voix (pas de timing.js) : version MUETTE à valider, sur le minutage estimé (estimation.js).
# Avec la voix ElevenLabs : align.py produit voix_script.m4a + timing.js, puis on relance ce script (supprimer .body_silent.mp4).
# usage : sh motion/videos/girardin/build.sh   (reprend là où il s'est arrêté si on le relance)
set -e
cd "$(dirname "$0")/../.."
OUT=videos/girardin
mkdir -p intro/defiscalisation outro/defiscalisation
[ -f intro/defiscalisation/intro_defiscalisation.mp4 ] || {
  node render.mjs "intro/intro.html?theme=defiscalisation" $OUT/.intro_silent.mp4 30
  ffmpeg -y -loglevel error -i $OUT/.intro_silent.mp4 -ss 2.06 -i brand/mic-sound-reference.m4a -map 0:v -map 1:a -c:v copy \
    -af "afade=t=in:d=0.25" -c:a aac -b:a 192k -ar 48000 -ac 2 -shortest intro/defiscalisation/intro_defiscalisation.mp4
  rm -f $OUT/.intro_silent.mp4
}
[ -f outro/defiscalisation/outro_defiscalisation.mp4 ] || {
  # même minutage que l'outro générique : on reprend sa bande-son validée
  node render.mjs "outro/outro.html?theme=defiscalisation" $OUT/.outro_silent.mp4 30
  ffmpeg -y -loglevel error -i $OUT/.outro_silent.mp4 -i outro/outro.mp4 -map 0:v -map 1:a -c:v copy -c:a copy -shortest outro/defiscalisation/outro_defiscalisation.mp4
  rm -f $OUT/.outro_silent.mp4
}
[ -f $OUT/.body_silent.mp4 ] || node render.mjs $OUT/video.html $OUT/.body_silent.mp4 30
if [ -f $OUT/timing.js ] && [ -f $OUT/voix_script.m4a ]; then
  ffmpeg -y -loglevel error -i $OUT/.body_silent.mp4 -i $OUT/voix_script.m4a -map 0:v -map 1:a -c:v copy \
    -c:a aac -b:a 192k -ar 48000 -ac 2 -shortest $OUT/.body.mp4
  FINAL=$OUT/girardin.mp4
else
  ffmpeg -y -loglevel error -i $OUT/.body_silent.mp4 -f lavfi -i anullsrc=r=48000:cl=stereo -map 0:v -map 1:a -c:v copy \
    -c:a aac -b:a 192k -shortest $OUT/.body.mp4
  FINAL=$OUT/girardin_muet.mp4
fi
ffmpeg -y -loglevel error -i intro/defiscalisation/intro_defiscalisation.mp4 -i $OUT/.body.mp4 -i outro/defiscalisation/outro_defiscalisation.mp4 \
  -filter_complex "[0:v][0:a][1:v][1:a][2:v][2:a]concat=n=3:v=1:a=1[v][a]" -map "[v]" -map "[a]" \
  -c:v libx264 -crf 20 -preset medium -pix_fmt yuv420p -c:a aac -b:a 192k $FINAL
rm -f $OUT/.body.mp4
echo "ok : $FINAL"
