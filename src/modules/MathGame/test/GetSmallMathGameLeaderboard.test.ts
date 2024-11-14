import { getSmallMathGameLeaderboard } from "../apis/GetSmallMathGameLeaderboard";

getSmallMathGameLeaderboard("135783794", {
    top: 5,
}).then((leaderboard) => {
    console.log(leaderboard);
})