import { getUserQueue } from "../../services/Spotify.service";

export async function showCurrentMusicQueue() {
    const userQueue = await getUserQueue()
    const queueView = userQueue.data.queue.map((track, index) => `${index+1}) "${track.name}" - ${track.artists.join(', ')}`)

    const limitedQueueView: string[] = []

    let textCount = 0
    let i = 0
    while (queueView[i].length + textCount < 500) {
        limitedQueueView.push(queueView[i])
        textCount = queueView[i].length + textCount
        i++
    }

    return { queueView: limitedQueueView.join(' | ') }
}