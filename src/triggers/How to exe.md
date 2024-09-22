## Allow Windows Defender to run the exe file
```
Set-MpPreference -ExclusionPath C:/Users/user/Documents/Twitch-Reward
```

## Create exe file
```
pyinstaller --onefile --noconsole src/triggers/
```
```
pyinstaller --onefile --noconsole --hidden-import src/triggers/
```
```
pyinstaller --noconfirm --onefile --windowed --hidden-import "pynput"  "C:\Users\user\Documents\Twitch-Reward\src\triggers\dead-hard-m4.py"
```