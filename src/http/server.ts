import { db } from '@/db/connection'
import { cors } from '@elysiajs/cors'
import { Elysia } from 'elysia'
import { indexDriver } from './routes/driver/_index-driver'
import { indexManager } from './routes/manager/_index-manager'

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
    return app.get('/filiais', () =>
      db.filial.findMany({ select: { id: true, name: true } }),
    )
  })

  // /driver/auth-links/authenticate
  .group('/driver', app => app.use(indexDriver))
  .group(
    '/manager',
    app => app.use(indexManager),
    //       .use(authentication)
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

app.listen(3333)

console.log(
  `🔥 HTTP server running at http://${app.server?.hostname}:${app.server?.port}`,
)
