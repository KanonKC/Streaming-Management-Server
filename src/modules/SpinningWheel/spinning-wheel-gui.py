import tkinter as tk

class SpinningWheelGUI:
    def __init__(self, master):
        self.master = master
        self.master.title("Spinning Wheel")
        self.master.geometry("400x400")
        self.master.resizable(False, False)

        self.canvas = tk.Canvas(self.master, width=400, height=400)
        self.canvas.pack()

        self.wheel = self.canvas.create_oval(50, 50, 350, 350, fill="white")
        self.pointer = self.canvas.create_line(200, 200, 200, 50, fill="black", width=2)

        # self.spin_button = tk.Button(self.master, text="Spin", command=self.spin)
        # self.spin_button.pack()

    def spin(self):
        speed = 0
        for i in range(100):
            self.canvas.move(self.pointer, 0, speed)
            self.master.update()
            speed += 1
        

def main():
    root = tk.Tk()
    app = SpinningWheelGUI(root)
    root.mainloop()

if __name__ == "__main__":
    main()