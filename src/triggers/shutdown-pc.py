# Shutdown PC
# This trigger will shutdown the PC when the trigger is activated.

import os

def main():
    os.system("shutdown /s /t 1")

if __name__ == "__main__":
    main()