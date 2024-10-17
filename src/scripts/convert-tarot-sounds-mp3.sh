# ffmpeg -i assets/sounds/tarot-voices/*.mp3 -vn -ar 44100 -ac 2 -b:a 192k -of assets/sounds/tarot-voices/normalized

for f in $(ls assets/sounds/tarot-voices); do
    ffmpeg -i assets/sounds/tarot-voices/$f -n -f wav assets/sounds/tarot-voices/converted/$f
done