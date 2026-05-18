import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
//Without CORS, modern browsers would block cross-origin requests for security reasons, preventing malicious behavior.
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import fastifySwagger from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import db from './models/index.js'
import { routes } from './routes.js'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import fastifyJwt from '@fastify/jwt'

const app = fastify().withTypeProvider<ZodTypeProvider>()

// ]The validatorCompiler is a function that returns a function to validate the body, URL parameters, headers, and query string. 
// The setValidatorCompiler function allows substituting ajv with other JavaScript validation libraries like joi or yup, or a custom one
app.setValidatorCompiler(validatorCompiler)
// The serializerCompiler returns a function that must return a string from an input object. When defining a response JSON Schema, change the default serialization method by providing a function to serialize each route.
app.setSerializerCompiler(serializerCompiler)

// API inicio 
app.register(fastifyCors, {
    origin: true, 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
})

app.register(fastifySwagger, {
    openapi: {
        info:{
            title: 'FASCO E-COMMERCE API',
            description: 'API for capturing and inspecting e-commerce requests', 
            version: '1.0.0',
        }, 
        tags: [
            {name:'Users', description:'User management'}, //pública
            {name: 'Sessions', description: 'Authentication'} //precisa de autenticar para acessar
        ]
    },
    transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
    routePrefix: '/docs'
})

app.register(fastifyJwt, {
    secret: 'CHAVE_JWT'
})

app.register(routes)

/* documentação: http://localhost:7777/docs */

// API Fim
// Banco de Dados inicia junto com a API
db.sequelize.sync().then(() => {
    app.listen({port: 7777}).then(() => {
        console.log('🔥HTTP server running on http://localhost:7777 !')
        console.log('📚 Docs available at  http://localhost:7777/docs !')
    }) 
})