import { getHangedManGameLeaderboards } from "../apis/GetHangedManGameLeaderboard";

getHangedManGameLeaderboards("135783794", {
    startPeroid: 1733470812000,

}).then((res) => {
    console.log(res);
})