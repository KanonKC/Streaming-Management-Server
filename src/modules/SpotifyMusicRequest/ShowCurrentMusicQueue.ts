import { getUserQueue } from "../../services/Spotify.service";
import { SpotifyTrack } from "../../types/Spotify.type";

const MaxTextCount = 250

function simplifyTrack(track: SpotifyTrack) {
    return `"${track.name}" - ${track.artists.map((artist) => artist.name).join(', ')}`
}

export async function showCurrentMusicQueue() {
    const userQueue = await getUserQueue()
    const queueText = userQueue.data.queue.map((track, index) => `${index+1}) ${simplifyTrack(track)}`)

    const limitedQueueText: string[] = [
        `[Currently Playing] ${userQueue.data.currently_playing ? simplifyTrack(userQueue.data.currently_playing) : 'Nothing'}`
    ]
    
    let textCount = 0
    let i = 0
    while (i < queueText.length && queueText[i].length + textCount < MaxTextCount) {
        if (i === 0) {
            limitedQueueText.push(`[Queue] -> ${queueText[i]}`)
        }
        else {
            limitedQueueText.push(queueText[i])
        }
        textCount = queueText[i].length + textCount
        i++
    }

    return { queueView: limitedQueueText.join(' • ') }
}