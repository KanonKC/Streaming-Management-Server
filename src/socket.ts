import { Server } from "socket.io";
import { configDotenv } from 'dotenv'

configDotenv();
const { SOCKET_PORT } = process.env;

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

io.listen(Number(SOCKET_PORT));
console.log(`Socket listening at http://localhost:${SOCKET_PORT}`);