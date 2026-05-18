import z from "zod"
import { FastifyTypedInstance } from "./types"
import isMobilePhone from 'validator/es/lib/isMobilePhone';
import UserModel from './models'
import bcrypt from 'bcrypt';
import id from "zod/v4/locales/id.js";

export async function routes(app: FastifyTypedInstance) {
    app.post('/users', {
        schema: {
            tags: ['Users'], 
            description: 'Create a new user', 
            body: z.object({
                firstName: z.string(), 
                lastName: z.string(), 
                email: z.email(), 
                phone: z.string().refine(isMobilePhone).trim(), //defini qual telefones vão ser validos
                password: z.string()
            }),
            response: {
                201: z.null().describe('User created')
            }
        }
    }, async (request, reply) => {
        const usersBody = request.body 
        await UserModel.User.create(usersBody);  //insere os dados no banco de dados
        reply.code(201).send(null);
    })

    app.post("/sessions", {
        schema: {
            tags: ['Sessions'], 
            description: 'Get a user', 
            body: z.object({
                email: z.email(), 
                password: z.string(),
            })
        }
    }, async (request, reply) => {
        const { email, password } = request.body;
        const user = await UserModel.User.findOne({where: {email} }) //Busca o usuário pelo email
        if (!user){
            return reply.status(401).send({message: 'Invalid credentials'})
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch){
            return reply.status(401).send('Invalid credentials')
        }

        const token = app.jwt.sign({id: user.id, email: user.email })
        return reply.status(200).send({
            token, 
            user: {
                id: user.id, 
                email: user.email
            }
        });
    });

    app.get('/users', {
        schema: {
            tags: ['Users'], 
            description: 'List users', 
            response: {
                200: z.array(z.object({
                    id: z.number(), 
                    firstName: z.string(), 
                    lastName: z.string(), 
                    email: z.string(), 
                    phone: z.string(),
                    password: z.string(), 
                }))
            }
        },
    }, async () => {
        const usersAll = await UserModel.User.findAll()
        return usersAll
    })

    app.delete('/users',
    {
        schema: {
            tags: ['Users'],
            description: 'Delete a user',
            body: z.object({
                id: z.number()
            }),
            response: {
                201: z.null().describe('User deleted')
            }
        }
    },
    async (request, reply) => {
        const { id } = request.body;

        await UserModel.User.destroy({
            where: { id }
        });

        reply.code(201).send(null);
    }
    );
}