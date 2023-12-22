import { db } from '@/db/connection'
import { cors } from '@elysiajs/cors'
import { Elysia } from 'elysia'
import { authenticate } from './routes/manager/authenticate'
import { authenticateFromLink } from './routes/manager/authenticate-from-link'

const app = new Elysia()
  .use(
    cors({
      credentials: true,
      allowedHeaders: ['content-type'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
      origin: (request): boolean => {
        const origin = request.headers.get('origin')

        if (!origin) {
          return false
        }

        return true
      },
    }),
  )
  .group('/find', app => {
   return app.get('/filiais', ()=>db.filial.findMany({select:{id:true,nome:true}}))
  })
   .group('/admin', app => {
     return (
       app
       .use(authenticate)
         .use(authenticateFromLink)
  //       .use(authentication)
  //       .use(signOut)
  //       .use(getProfile)
  //       .use(getManagedRestaurant)
  //       .use(registerRestaurant)
  //       .use(registerCustomer)
  //       // .use(sendAuthenticationLink)
  //       .use(createOrder)
  //       .use(approveOrder)
  //       .use(cancelOrder)
  //       .use(dispatchOrder)
  //       .use(deliverOrder)
  //       .use(getOrders)
  //       .use(getOrderDetails)
  //       .use(createEvaluation)
  //       .use(getEvaluations)
  //       .use(updateMenu)
  //       .use(updateProfile)
  //       .use(getMonthReceipt)
  //       .use(getMonthOrdersAmount)
  //       .use(getDayOrdersAmount)
  //       .use(getMonthCanceledOrdersAmount)
  //       .use(getDailyReceiptInPeriod)
  //       .use(getPopularProducts)
     )
  })

app.listen(3333)

console.log(
  `🔥 HTTP server running at http://${app.server?.hostname}:${app.server?.port}`,
)
