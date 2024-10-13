import cors from '@fastify/cors'
import { configDotenv } from 'dotenv'
import server from './router'
import { getSpotifyOAuthUrl } from './services/Spotify.service'
import { getTwitchOAuthUrl } from './services/Twitch.service'
import { twitchStore } from './stores/Twitch.store'
import { createChannelChatMessageEvent } from './events/ChannelChatMessage/CreateChannelChatMessageEvent'

configDotenv()
const PORT = Number(process.env.PORT) || 8080

server.register(cors, { 
    origin: '*'
})

server.listen({ port: PORT }, async (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  await twitchStore.getAppAccessToken()
//   const chatEvent = await createChannelChatMessageEvent()
//   console.log('chatEvent', chatEvent)
  console.log(`Server listening at ${address}`)
  console.log('----- Spotify -----')
  console.log(getSpotifyOAuthUrl())
  console.log('----- Twitch -----')
  console.log(getTwitchOAuthUrl())
})