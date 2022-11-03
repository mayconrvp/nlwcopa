import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      avatarUrl: 'https://github.com/mayconrvp'
    }
  })

  const pool = await prisma.pool.create({
    data: {
        title: 'Example Pool',
        code: 'BOL123',
        ownerId: user.id,

        participants: {
          create: {
            userId: user.id
          }
        }
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-02T12:00:00.169Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR'
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-03T02:06:26.169Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,
          
          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  })

  // const partiicpant = await prisma.participant.create({
  //   data: {
  //     poolId: pool.id,
  //     userId: user.id
  //   }
  // })
}

main ()