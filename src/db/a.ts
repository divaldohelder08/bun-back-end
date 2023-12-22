import dayjs from 'dayjs'
import { db } from './connection'

const authLinkFromCode = await db.authLinksManager.findFirst({
  where: {
    code: 'hmhdy5dr6fjwd0fad18y9ry5',
  },
})
if (!authLinkFromCode) {
  console.log('UnauthorizedError')
} else {
  if (dayjs().diff(authLinkFromCode.createdAt, 'minute') > 5) {
    console.log('expirado')
  } else {
    console.log('pedding')
  }
}
