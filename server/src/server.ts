import express from 'express';
import { PrismaClient } from '@prisma/client'
import { convertHourStringToMinute } from './utils/convert-hour-string-to-minute';
import { convertMinuteToHourString } from './utils/convert-minute-string-to-hour-string';
import cors from 'cors';

const app = express()
const prisma = new PrismaClient({
    log: ['query']
}) //Conecta automaticamente com o banco

//HTTP methods - get, post, put, patch, delete
//HTTP codes - 200, 201, 300, 400, 404, 500, etc...
//Persistir estado - manter o conteúdo da página

app.use(express.json())//dizemos para o express aceitar o tipo json
app.use(cors())

app.get('/games', async (request, response)=> {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    })
    return response.json(games)
})

app.post('/games/:id/ads', async (request, response)=> {
    const gameId = request.params.id;
    const body: any = request.body

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,           
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourStringToMinute(body.hourStart),
            hourEnd: convertHourStringToMinute(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel
        }
    })

    return response.status(201).json(ad)
})

app.get('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            yearsPlaying: true,
            weekDays: true,
            hourStart: true,
            hourEnd: true,
            useVoiceChannel: true,
            gameId: true
        },

        where:{
            gameId,
        },

        orderBy:{
            createdAt: 'desc',
        }
    })
    return response.json(ads.map(ad => {
        return {
            ...ad, //retorna tudo que está dentro de ad.
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinuteToHourString(ad.hourStart),
            hourEnd: convertMinuteToHourString(ad.hourEnd)
        }
    }))
})

app.get('/ads/:id/discord', async (request, response) => {
    const adId = request.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,
        },

        where: {
            id: adId,
        }
    })
    return response.json({ discord: ad.discord, })
})

app.listen(3333)