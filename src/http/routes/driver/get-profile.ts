import { db } from '@/db/connection'
import Elysia from 'elysia'
import { authentication } from './authentication'

export const getProfile = new Elysia()
  .use(authentication)
  .get('/me', async ({ getCurrentDriver }) => {
    const { sub: sub } = await getCurrentDriver()

    const driver = await db.driver.findFirst({
      where: {
        id: sub,
      },
    })

    if (!driver) {
      throw new Error('User not found.')
    }

    return driver
  })
