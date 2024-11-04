import { downloadTwitchClip } from "../utils/DownloadTwitchClip.util";

downloadTwitchClip("https://clips.twitch.tv/SillyTangibleCakeDuDudu", {
    resolution: { width: 1920, height: 1080 }
}).then((response) => {
    console.log(response)
})

// https://clips.twitch.tv/CrypticBenevolentBearTinyFace-bgwCnbjwmChpGuak