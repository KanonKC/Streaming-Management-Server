import { createPrediction } from "../../../services/Twitch.service";

createPrediction({
    broadcaster_id: '135783794',
    title: 'Will I win this game?',
    outcomes: [
        { title: 'Yes' },
        { title: 'No' }
    ],
    prediction_window: 60
}).then((response) => {
    console.log(response)
})