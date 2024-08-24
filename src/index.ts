import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import Filter from 'bad-words'
import { request } from 'http'
import { getRandomFood } from './modules/GetRandomFood'
import { changeStreamTitle } from './modules/ChangeStreamTitle'
import { getChannelInfo } from './services/Twitch.service'
import { changeMischangingLanguageThaiToEnglish } from './modules/ChangeMischangingLanguageThaiToEnglish'
import { getOneIceBreakingQuestion } from './modules/GetOneIceBreakingQuestion'
import { showImage } from './modules/ShowImage'
import { clearBackslash } from './utils/ClearBackslash'
import { showFeaturedTwitchClip } from './modules/ShowFeaturedTwitchClip'
import { prisma } from './prisma'

const server = fastify()

server.get('/ping', async (request, reply) => {
  return {data:'here'}
    // return 'here'
})

type ChangeStreamTitle = FastifyRequest<{
  Querystring: { newTitle: string }
}>

type GetRandomFood = FastifyRequest<{
  Querystring: { filter: string }
}>

type MischangeTH2EN = FastifyRequest<{
  Querystring: { text: string }
}>

type ShowImage = FastifyRequest<{
  Querystring: { url: string }
  Headers: {
    imageurl: string
    twitchid: string
    username: string
  }
}>

type FeatureClip = FastifyRequest<{
  Querystring: { broadcasterId: string }
}>

type TwitchChannelPointRedeemed = FastifyRequest<{
  Headers: {
    userid: string
    username: string
    rewardid: string
    rewardname: string
    rewardcost: number
    rewardprompt: string
  }
}>

server.get('/title', async (request: ChangeStreamTitle, reply) => {
    const { newTitle } = request.query
    const channelInfo = await getChannelInfo('135783794')
    const currentTitle = channelInfo.data[0].title
    const newLegitTitle = changeStreamTitle(currentTitle, newTitle)
    return { title: newLegitTitle }
})

server.get('/foods', async (request: GetRandomFood, reply: FastifyReply) => {
    const query = request.query.filter
    console.log(query)
    const menu = await getRandomFood(query)
    if (!menu) {
        const subMenu = await getRandomFood('')
        reply.send({ menu: subMenu, found: false })
    }
    reply.send({ menu, found: true })
})

// server.get('/mischange/th-en', async (request: MischangeTH2EN, reply: FastifyReply) => {
//     const text = request.query.text
//     console.log(text)
//     const changingResult = await changeMischangingLanguageThaiToEnglish(text)
//     console.log(changingResult)
//     if (changingResult === undefined) {
//         reply.send({ text: null, mischange: false })
//     }
//     else {
//         reply.send({ text: changingResult, mischange: true })
//     }
// })

server.get('/ice-breaking', async (request: FastifyRequest, reply: FastifyReply) => {
    const question = await getOneIceBreakingQuestion()
    reply.send({ question: question })
})

server.get('/image', async (request: ShowImage, reply: FastifyReply) => {
    const { imageurl, twitchid, username } = request.headers
    const formatUrl = clearBackslash(String(imageurl))
    console.log(formatUrl)
    await showImage(formatUrl, twitchid, username)
    reply.status(204).send()
})

server.get('/feature-clip', async (request: FeatureClip, reply: FastifyReply) => {
    const { broadcasterId } = request.query;
    console.log(broadcasterId)
    const response = await showFeaturedTwitchClip(String(broadcasterId))
    console.log(response)
    reply.send(response)
})

server.get('/twitch/channel-point', async (request: TwitchChannelPointRedeemed, reply: FastifyReply) => {
    const { 
        userid,
        username,
        rewardid,
        rewardname,
        rewardcost,
        rewardprompt
    } = request.headers;
  
    await prisma.twitchChannelPointRedeemedLog.create({
      data: {
        userId: userid,
        username: username,
        rewardId: rewardid,
        rewardName: rewardname,
        rewardCost: Number(rewardcost),
        rewardPrompt: rewardprompt,
      }
    })

    reply.status(204)
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})