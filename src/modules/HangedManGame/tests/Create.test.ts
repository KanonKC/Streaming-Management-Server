import { createHangedManGame } from "../apis/CreateHangedManGame";

createHangedManGame(8).then((res) => {
    console.log(res);
});