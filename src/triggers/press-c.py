import win32api, win32con
from time import sleep

win32api.keybd_event(0x43, 0, 0, 0)
sleep(1.5)
win32api.keybd_event(0x43, 0, win32con.KEYEVENTF_KEYUP, 0)
