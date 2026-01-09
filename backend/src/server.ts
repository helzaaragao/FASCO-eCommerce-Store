import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'

const app = fastify()

app.register(fastifyCors, {origin: '*'})

app.listen({port: 7777}).then(() => {
    console.log('HTTP server running!')
})