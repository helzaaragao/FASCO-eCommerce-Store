import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import db from './models/index.js'
const app = fastify()


app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, {origin: '*'}) 

db.sequelize.sync().then(() => {
    app.listen({port: 7777}).then(() => {
        console.log('HTTP server running!')
    }) 
})