import win32api, win32con
from time import sleep

def pressEBetweenKey(key):
    win32api.keybd_event(key, 0, 0, 0)
    sleep(0.1)
    win32api.keybd_event(0x45, 0, 0, 0)
    sleep(0.1)
    win32api.keybd_event(0x45, 0, win32con.KEYEVENTF_KEYUP, 0)
    sleep(0.1)
    win32api.keybd_event(key, 0, win32con.KEYEVENTF_KEYUP, 0)

# Press middle mouse
win32api.mouse_event(win32con.MOUSEEVENTF_MIDDLEDOWN, 0, 0, 0, 0)

# Press W A S D
pressEBetweenKey(0x57)
pressEBetweenKey(0x41)
pressEBetweenKey(0x53)
pressEBetweenKey(0x44)

# Release middle mouse
win32api.mouse_event(win32con.MOUSEEVENTF_MIDDLEUP, 0, 0, 0, 0)