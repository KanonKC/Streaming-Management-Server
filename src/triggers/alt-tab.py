import win32api, win32con
        
# Press Alt+Tab
win32api.keybd_event(0x12, 0, 0, 0)
win32api.keybd_event(0x09, 0, 0, 0)
win32api.keybd_event(0x09, 0, win32con.KEYEVENTF_KEYUP, 0)
win32api.keybd_event(0x12, 0, win32con.KEYEVENTF_KEYUP, 0)