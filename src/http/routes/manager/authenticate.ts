import { db } from '@/db/connection'
import { env } from '@/env'
import { resend } from '@/mail/client'
import { MagicLinkAuthTemplate } from '@/mail/templates/magic-link-auth-template'
import { createId } from '@paralleldrive/cuid2'
import Elysia, { t } from 'elysia'
import { EmailNotSendedError } from '../errors/email-not-sended-error'
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
            nome: true,
          },
        },
      },
    })
    if (!user) {
      throw new UnauthorizedError()
    }

    const authLinkCode = createId()

    await db.authLinksManager.create({
      data: { managerId: user.manager.id, code: authLinkCode },
    })

    const authLink = new URL('/admin/auth-links/authenticate', env.API_BASE_URL)
    authLink.searchParams.set('code', authLinkCode)
    authLink.searchParams.set('redirect', env.AUTH_REDIRECT_URL)
    console.log(authLink.href)

    const mail = await resend.emails.send({
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
