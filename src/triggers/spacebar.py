import win32api, win32con
from time import sleep

for i in range(10):
    win32api.keybd_event(0x20, 0, 0, 0)
    win32api.keybd_event(0x20, 0, win32con.KEYEVENTF_KEYUP, 0)
    sleep(0.1)