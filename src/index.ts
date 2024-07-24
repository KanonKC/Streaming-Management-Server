import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import Filter from 'bad-words'
import { request } from 'http'
import { getRandomFood } from './modules/GetRandomFood'
import { changeStreamTitle } from './modules/ChangeStreamTitle'
import { getChannelInfo } from './services/Twitch.service'
import { changeMischangingLanguageThaiToEnglish } from './modules/ChangeMischangingLanguageThaiToEnglish'
import { getOneIceBreakingQuestion } from './modules/GetOneIceBreakingQuestion'

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

//     const changingResult = await changeMischangingLanguageThaiToEnglish(text)

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

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at a ${address}`)
})