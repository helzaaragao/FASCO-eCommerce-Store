import z from "zod"
import { FastifyTypedInstance } from "./types"
import isMobilePhone from 'validator/es/lib/isMobilePhone';
import UserModel from './models'
 
interface User {
    id: string
    firstName: string 
    lastName: string
    email: string
    phone: string
    password: string
}
export async function routes(app: FastifyTypedInstance) {
    app.get('/users', {
        schema: {
            tags: ['users'], 
            description: 'List users', 
            response: {
                200: z.array(z.object({
                    id: z.string(), 
                    firstName: z.string(), 
                    lastName: z.string(), 
                    email: z.string(), 
                    phone: z.string(),
                    password: z.string(), 
                }))
            }
        },
    }, () => {
        return []
    })

    app.post('/users', {
        schema: {
            tags: ['users'], 
            description: 'Create a new user', 
            body: z.object({
                firstName: z.string(), 
                lastName: z.string(), 
                email: z.email(), 
                phone: z.string().refine(isMobilePhone), //defini qual telefones vão ser validos
                password: z.string()
            }),
            response: {
                201: z.null().describe('User created')
            }
        }
    }, async (request, reply) => {
        const users = request.body 
        await UserModel.User.create(users); //insere os dados no banco de dados
        reply.code(201).send();
    })
}