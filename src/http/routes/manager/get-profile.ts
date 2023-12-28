import { db } from '@/db/connection'
import Elysia from 'elysia'
import { authentication } from './authentication'

export const getProfile = new Elysia()
  .use(authentication)
  .get('/me', async ({ getCurrentManager }) => {
    const { sub: managerId } = await getCurrentManager()

    const manager = await db.manager.findFirst({
      where: {
        id: managerId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        Filial: {
          select: {
            id: true,
            address: true,
            name: true,
            status: true,
            createdAt: true,
          },
        },
      },
    })

    if (!manager) {
      throw new Error('Driver not found.')
    }

    return manager
  })
