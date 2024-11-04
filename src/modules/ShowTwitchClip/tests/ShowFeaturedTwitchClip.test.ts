import { showFeaturedTwitchClip } from "../apis/ShowFeaturedTwitchClip";

showFeaturedTwitchClip("135783794").then((response) => {
    console.log(response);
})