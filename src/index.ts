import { configDotenv } from 'dotenv'
import server from './router'
import cors from '@fastify/cors'
import { getOAuthUrl } from './services/Spotify.service'
import { spotifyStore } from './stores/Spotify.store'

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
  const spotifyOAuthUrl = getOAuthUrl()
  console.log(`Server listening at ${address}`)
  console.log(`Please login to Spotify at ${spotifyOAuthUrl}`)
})