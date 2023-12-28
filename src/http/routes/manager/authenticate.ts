import { db } from '@/db/connection'
import { env } from '@/env'
import { createId } from '@paralleldrive/cuid2'
import Elysia, { t } from 'elysia'
import { UnauthorizedError } from '../errors/unauthorized-error'

export const authenticate = new Elysia().post(
  '/authenticate',
  async ({ body }) => {
    const { email, filial_id } = body
    const user = await db.filial.findFirst({
      where: {
        id: filial_id,
        manager: {
          email,
        },
      },
      select: {
        id: true,
        manager: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
    if (!user) {
      console.log('fora', user)
      throw new UnauthorizedError()
    }
    console.log('dentro', user)

    const authLinkCode = createId()

    await db.authLinksManager.create({
      data: { managerId: user.manager.id, code: authLinkCode },
    })

    const authLink = new URL('/admin/auth-links/authenticate', env.API_BASE_URL)
    authLink.searchParams.set('code', authLinkCode)
    authLink.searchParams.set('redirect', env.AUTH_REDIRECT_URL_MANAGER)
    console.log(authLink.href)

    await resend.emails.send({
      from: 'Mukumbo <naoresponda@fala.dev>',
      to: email,
      subject: '[Mukumbo] Link para login',
      react: MagicLinkAuthTemplate({
        userEmail: email,
        authLink: authLink.toString(),
        username: user.manager.nome,
      }),
    })

    if (!mail) {
      throw new EmailNotSendedError()
    }
  },
  {
    body: t.Object({
      email: t.String({ format: 'email' }),
      filial_id: t.String(),
    }),
  },
)
