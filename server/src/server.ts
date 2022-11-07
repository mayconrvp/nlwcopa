import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt'


import { PrismaClient } from '@prisma/client';

import { poolRoutes } from './routes/pool';
import { guessRoutes } from './routes/guess';
import { gameRoutes } from './routes/game';
import { authRoutes } from './routes/auth';
import { userRoutes } from './routes/user';

const prisma = new PrismaClient({
    log: ['query']
})

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  // http://localhost:3333/pools/count

  await fastify.register(cors, {
    origin: true,
  })

  // Em produção isso precisa ser uma variavel de ambiente
  await fastify.register(jwt, {
    secret: 'nlwcopa',
  })

  await fastify.register(poolRoutes);
  await fastify.register(authRoutes);
  await fastify.register(gameRoutes);
  await fastify.register(guessRoutes);
  await fastify.register(userRoutes);
  
  await fastify.listen({
    port: 3333,
    host: '0.0.0.0'
  })
}

bootstrap();