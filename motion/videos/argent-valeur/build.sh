#!/bin/sh
# Monte « L'argent suit la valeur » (série LES BASES) : intro MIC « LES BASES » + corps animé (voix ElevenLabs calée) + outro « LES BASES ».
# usage : sh motion/videos/argent-valeur/build.sh   (supprimer .body_silent.mp4 pour refaire le rendu des images)
set -e
cd "$(dirname "$0")/../.."
OUT=videos/argent-valeur
mkdir -p intro/bases outro/bases
[ -f intro/bases/intro_bases.mp4 ] || {
  node render.mjs "intro/intro.html?theme=bases" $OUT/.intro_silent.mp4 30
  ffmpeg -y -loglevel error -i $OUT/.intro_silent.mp4 -ss 2.06 -i brand/mic-sound-reference.m4a -map 0:v -map 1:a -c:v copy \
    -af "afade=t=in:d=0.25" -c:a aac -b:a 192k -ar 48000 -ac 2 -shortest intro/bases/intro_bases.mp4
  rm -f $OUT/.intro_silent.mp4
}
[ -f outro/bases/outro_bases.mp4 ] || {
  # même minutage que l'outro générique : on reprend sa bande-son validée
  node render.mjs "outro/outro.html?theme=bases" $OUT/.outro_silent.mp4 30
  ffmpeg -y -loglevel error -i $OUT/.outro_silent.mp4 -i outro/outro.mp4 -map 0:v -map 1:a -c:v copy -c:a copy -shortest outro/bases/outro_bases.mp4
  rm -f $OUT/.outro_silent.mp4
}
[ -f $OUT/.body_silent.mp4 ] || node render.mjs $OUT/video.html $OUT/.body_silent.mp4 30
ffmpeg -y -loglevel error -i $OUT/.body_silent.mp4 -i $OUT/voix_script.m4a -map 0:v -map 1:a -c:v copy \
  -c:a aac -b:a 192k -ar 48000 -ac 2 -shortest $OUT/.body.mp4
ffmpeg -y -loglevel error -i intro/bases/intro_bases.mp4 -i $OUT/.body.mp4 -i outro/bases/outro_bases.mp4 \
  -filter_complex "[0:v][0:a][1:v][1:a][2:v][2:a]concat=n=3:v=1:a=1[v][a]" -map "[v]" -map "[a]" \
  -c:v libx264 -crf 20 -preset medium -pix_fmt yuv420p -c:a aac -b:a 192k $OUT/argent-valeur.mp4
rm -f $OUT/.body.mp4
echo "ok : $OUT/argent-valeur.mp4"
