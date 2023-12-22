import { db } from '@/db/connection'
import { fakerPT_BR as faker } from '@faker-js/faker'
import chalk from 'chalk'
// Cspell:ignore Camama Talatona alice veicolos Mnomes Cnomes descricao Anomes Mdata

/**
 * create 3 adm
 */
const Anomes = Array.from({ length: 2 }).map(() => {
  return { first: faker.person.firstName(), last: faker.person.lastName() }
})
await db.manager.createMany({
  data: [
    {
      email: 'divaldohelder08@gmail.com',
      nome: 'Divaldo Hélder',
      role: 'superGerente',
    },
    {
      nome: `${Anomes[0].first} ${Anomes[0].last}`,
      email: faker.internet.email({
        firstName: Anomes[0].first,
        lastName: Anomes[0].last,
      }).toLowerCase(),
    },
    {
      email: faker.internet.email({
        firstName: Anomes[1].first,
        lastName: Anomes[1].last,
      }).toLowerCase(),
      nome: `${Anomes[1].first} ${Anomes[1].last}`,
    },
  ],
})
console.log(chalk.yellow('✔ manager seeded'))
const managers = await db.manager.findMany()

/**
 * create 3 filiais
 */
await db.filial.createMany({
  data: [
    {
      nome: `Camama ${faker.location.state({
        abbreviated: true,
      })}`,
      telefone: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
      endereco: faker.location.streetAddress({ useFullAddress: true }),
      managerId: managers[0].id,
    },
    {
      nome: `Talatona ${faker.location.state({
        abbreviated: true,
      })}`,
      telefone: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
      endereco: faker.location.streetAddress({ useFullAddress: true }),
      managerId: managers[1].id,
    },
    {
      nome: `vila alice ${faker.location.state({
        abbreviated: true,
      })}`,
      telefone: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
      endereco: faker.location.streetAddress({ useFullAddress: true }),
      managerId: managers[2].id,
    },
  ],
})
const filiais = await db.filial.findMany()
console.log(chalk.yellow('✔ filiais seeded'))

/**
 * create 3 veículos
 */
await db.veiculo.createMany({
  data: [
    {
      matricula: faker.helpers.fromRegExp(/LD-[^a-z]{2}-[^a-z]{2}/),
    },
    {
      matricula: faker.helpers.fromRegExp(/LD-[^a-z]{2}-[^a-z]{2}/),
    },
    {
      matricula: faker.helpers.fromRegExp(/LD-[^a-z]{2}-[^a-z]{2}/),
    },
  ],
})
const veicolos = await db.veiculo.findMany()
console.log(chalk.yellow('✔ veiculo seeded'))

/**
 * create 3 motoristas
 */
const Mnomes = Array.from({ length: 3 }).map(() => {
  return { first: faker.person.firstName(), last: faker.person.lastName() }
})

await db.motorista.createMany({
  data: Mnomes.map((i, index) => {
    return {
      nome: `${i.first} ${i.last}`,
      email: faker.internet.email({
        firstName: i.first,
        lastName: i.last,
      }).toLowerCase(),
      coordenadas: faker.location.nearbyGPSCoordinate(),
      senha: faker.internet.password({ length: 10 }),
      telefone: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
      numeroBI: faker.helpers.fromRegExp(
        /[^a-zA-Z]{9}[^a-z0-9]{2}[^a-zA-Z]{2}/,
      ),
      nascimento: faker.date.past({ years: 30 }),
      avatar: faker.image.avatar(),
      veiculoId: veicolos[index].id,
      filialId: faker.helpers.arrayElement([
        filiais[0].id,
        filiais[1].id,
        filiais[2].id,
      ]),
    }
  }),
})
const motoristas = await db.motorista.findMany()
console.log(chalk.yellow('✔ motorista seeded'))

/**
 * create 6 client
 */
const Cnomes = Array.from({ length: 6 }).map(() => {
  return { first: faker.person.firstName(), last: faker.person.lastName() }
})

await db.cliente.createMany({
  data: Cnomes.map(i => {
    return {
      nome: `${i.first} ${i.last}`,
      email: faker.internet.email({
        firstName: i.first,
        lastName: i.last,
      }).toLowerCase(),
      coordenadas: faker.location.nearbyGPSCoordinate(),
      telefone: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
      numeroBI: faker.helpers.fromRegExp(
        /[^a-zA-Z]{9}[^a-z0-9]{2}[^a-zA-Z]{2}/,
      ),
      nascimento: faker.date.past({ years: 30 }),
      avatar: faker.image.avatar(),
      filialId: faker.helpers.arrayElement([
        filiais[0].id,
        filiais[1].id,
        filiais[2].id,
      ]),
      endereco: faker.location.streetAddress(),
    }
  }),
})
const clientes = await db.cliente.findMany()
console.log(chalk.yellow('✔ clientes seeded'))

/**
 * create Recolhas
 */

await db.recolha.createMany({
  data: Array.from({ length: 6 }).map((e, index) => {
    return {
      clienteId: faker.helpers.arrayElement(
        Array.from({ length: 6 }).map((_, i) => clientes[i].id),
      ),
      motoristaId: faker.helpers.arrayElement(
        Array.from({ length: 3 }).map((_, i) => motoristas[i].id),
      ),
      filialId: faker.helpers.arrayElement(
        Array.from({ length: 3 }).map((_, i) => filiais[i].id),
      ),
      coordenadas: faker.location.nearbyGPSCoordinate(),
      descricao: faker.lorem.paragraph(),
      distance: faker.number.float(),
      duration: faker.number.float(),
      directions: JSON.stringify(faker.science.chemicalElement(), null, 2),
    }
  }),
})
console.log(chalk.yellow('✔ recolhas seeded'))
console.log(chalk.greenBright('Database seeded successfully!'))
process.exit()
