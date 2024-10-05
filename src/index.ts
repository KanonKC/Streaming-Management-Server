import cors from '@fastify/cors'
import { configDotenv } from 'dotenv'
import server from './router'
import { getSpotifyOAuthUrl } from './services/Spotify.service'
import { getTwitchOAuthUrl } from './services/Twitch.service'

configDotenv()
const PORT = Number(process.env.PORT) || 8080

server.register(cors, { 
    origin: '*'
})

server.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
  console.log('----- Spotify -----')
  console.log(getSpotifyOAuthUrl())
  console.log('----- Twitch -----')
  console.log(getTwitchOAuthUrl())
})