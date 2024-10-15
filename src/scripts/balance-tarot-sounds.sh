# for f in $(ls assets/sounds/tarot-voices); do
#     ffmpeg -i assets/sounds/tarot-voices/$f -af "normalize_rms=-20dB" assets/sounds/tarot-voices/normalized/$f
# done

ffmpeg-normalize assets/sounds/tarot-voices/converted/*.mp3 -of assets/sounds/tarot-voices/normalized -ext mp3