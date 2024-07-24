import win32api, win32con
from time import sleep

for i in range(10):
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN, 0, 0)
    sleep(0.1)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP, 0, 0)
    sleep(0.1)

# pyinstaller --onefile --noconsole main.py