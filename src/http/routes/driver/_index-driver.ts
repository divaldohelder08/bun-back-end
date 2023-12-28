import Elysia from 'elysia'
import { authenticate } from './authenticate'
import { authenticateFromLink } from './authenticate-from-link'
import { authentication } from './authentication'
import { getProfile } from './get-profile'

export const indexDriver = new Elysia()
  .use(authentication) //sub root
  .use(authenticate) // /driver/authenticate => Post
  .use(getProfile) // /driver/me => get
  .use(authenticateFromLink) // /driver/auth-links/authenticate => get
