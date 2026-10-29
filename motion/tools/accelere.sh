#!/bin/sh
# Version accélérée d'une vidéo finie : intro et outro à vitesse normale (le son MIC reste intact),
# corps accéléré (image + voix, voix sans changement de hauteur grâce à atempo).
# Trois passes séparées (pas de découpe multiple dans un même filtre : sinon la mémoire explose), puis assemblage.
# usage : sh motion/tools/accelere.sh <video.mp4> <intro.mp4> <outro.mp4> <sortie.mp4> [vitesse=1.25]
set -e
V=$1; OUT=$4; K=${5:-1.25}
I=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$2"); O=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$3")
T=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$V"); B=$(python3 -c "print(round($T-$O,3))")
TMP=$(dirname "$OUT")/.acc_$$; mkdir -p "$TMP"
E="-c:v libx264 -crf 20 -preset medium -pix_fmt yuv420p -r 30 -c:a aac -b:a 192k -ar 48000 -ac 2"
ffmpeg -y -loglevel error -i "$V" -t "$I" $E "$TMP/a.mp4"
ffmpeg -y -loglevel error -ss "$I" -to "$B" -i "$V" -vf "setpts=PTS/$K,fps=30" -af "atempo=$K" $E "$TMP/b.mp4"
ffmpeg -y -loglevel error -ss "$B" -i "$V" $E "$TMP/c.mp4"
printf "file 'a.mp4'\nfile 'b.mp4'\nfile 'c.mp4'\n" > "$TMP/l.txt"
ffmpeg -y -loglevel error -f concat -safe 0 -i "$TMP/l.txt" -c copy -movflags +faststart "$OUT"
rm -rf "$TMP"
echo "ok : $OUT ($(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT") s, avant $T s)"
