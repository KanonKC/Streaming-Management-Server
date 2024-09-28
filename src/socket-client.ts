import { io } from 'socket.io-client';
import { configDotenv } from 'dotenv'

configDotenv();
const { SOCKET_PORT } = process.env;

const socket = io(`http://localhost:${SOCKET_PORT}`);

export default socket;