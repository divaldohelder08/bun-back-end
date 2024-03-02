# Rotas e body de recolhas que usei

[x] - Rotas da cooperativa
    GET => /cooperativa/get-all-drivers
          return await db.driver.findMany({
            select: {
              id: true,
              numberBI: true,
              name: true,
              email: true,
              nascimento: true,
              createdAt: true,
              status: true,
              filias: {
                select: {
                  name: true,
                },
              },
              veiculos: {
                select: {
                  matricula: true,
                },
              },  
            },
          })  

  // .use(getAllReceiptInPeriod) // /cooperativa/all-receipt-in-period
  // .use(getAllDrivers) // /cooperativa/get-all-drivers => get
  // .use(getAllClients) // /cooperativa/get-all-clients => get
  // .use(deleteClient)
  // .use(getAllFilial) // /cooperativa/get-all-filial
  // .use(getDriverById) // /cooperativa/get-driver-by-id
  // .use(getClientById) // /cooperativa/get-client-by-id
  // .use(getDeleteClientById)
  // .use(getOverView)
  // .use(getSuperManagers)
  // .use(updateFilialStatus)
  // .group("/metrics", (app) => app.use(indexMetrics))
  // .group("/geo-map", (app) => app.use(indexGeoMap));
