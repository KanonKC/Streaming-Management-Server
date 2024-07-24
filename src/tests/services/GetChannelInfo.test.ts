import { getChannelInfo } from "../../services/Twitch.service";

getChannelInfo('135783794').then((data) => {
    console.log(data)
})