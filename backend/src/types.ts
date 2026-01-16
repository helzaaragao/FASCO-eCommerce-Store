import { FastifyBaseLogger, FastifyInstance, RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export type FastifyTypedInstance = FastifyInstance<
    RawServerDefault, 
    RawRequestDefaultExpression, 
    RawReplyDefaultExpression,
    FastifyBaseLogger, 
    ZodTypeProvider
>
//Type Providers are a TypeScript feature that enables to infer type information from inline JSON Schema. 
// They are an alternative to specifying generic arguments on routes and can reduce the need to keep associated types for each schema in a project.