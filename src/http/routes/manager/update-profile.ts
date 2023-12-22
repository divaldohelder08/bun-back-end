import { db } from '@/db/connection'
import { eq } from 'drizzle-orm'
import Elysia, { t } from 'elysia'
import { restaurants } from 'schema'
import { authentication } from '../authentication'

export const updateProfile = new Elysia().use(authentication).put(
  '/profile',
  async ({ getManagedRestaurantId, set, body }) => {
    const restaurantId = await getManagedRestaurantId()
    const { name, description } = body

    await db
      .update(restaurants)
      .set({
        name,
        description,
      })
      .where(eq(restaurants.id, restaurantId))

    set.status = 204
  },
  {
    body: t.Object({
      name: t.String(),
      description: t.Optional(t.String()),
    }),
  },
)
