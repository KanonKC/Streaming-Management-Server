import { Server } from "socket.io";

const io = new Server({
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    socket.on("reloadTwitchChannelPointRedeemedLog", async () => {
        io.emit("reloadTwitchChannelPointRedeemedLog");
    });
})

io.listen(8003);