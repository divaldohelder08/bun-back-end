import { db } from "@/db/connection";
import { fakerPT_BR as faker } from "@faker-js/faker";
import chalk from "chalk";
// Spell:ignore Currentclient
interface seedFullProps {
  clients: number;
  drivers: number;
}
const filias = [
  {
    name: `Camama 2 ${faker.location.state({
      abbreviated: true,
    })}`,
    address: faker.location.streetAddress({ useFullAddress: true }),
    email: "camama@mukumbo.dev",
    coordenadas: [-8.841198, 13.295715],
    tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
  },
  {
    name: `Golf 2 ${faker.location.state({
      abbreviated: true,
    })}`,
    tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
    address: faker.location.streetAddress({ useFullAddress: true }),
    email: "golf2@mukumbo.dev",
    coordenadas: [-8.888436, 13.240898],
  },
  {
    name: "Vila alice",
    tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
    address: faker.location.streetAddress({ useFullAddress: true }),
    email: "vilaalice@mukumbo.dev",
    coordenadas: [-8.825587, 13.247704],
  },
];
export async function seedFull({
  clients: clientsLength,
  drivers: driversLength,
}: seedFullProps) {
  enum sexo {
    masculino = "M",
    feminino = "F",
  }

  // await db.filial.create({
  //   data: {
  //     name: `Camama ${faker.location.state({
  //       abbreviated: true,
  //     })}`,
  //     address: faker.location.streetAddress({ useFullAddress: true }),
  //     email: "camama@mukumbo.dev",
  //     coordenadas: [-8.841198, 13.295715],
  //     tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
  //     manager: {
  //       create: {
  //         name: faker.person.fullName(),
  //         email: faker.internet.email(),
  //         tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
  //         avatar: faker.image.avatar(),
  //         sexo: faker.helpers.enumValue(sexo),
  //       },
  //     },
  //     clients: {
  //       create: Array.from({ length: clientsLength }).map((c) => {
  //         const sex = faker.helpers.enumValue(sexo);
  //         const firstName = faker.person.firstName(
  //           sex === "M" ? "male" : "female",
  //         );
  //         const lastName = faker.person.lastName(
  //           sex === "M" ? "male" : "female",
  //         );
  //         const Currentclient = {
  //           name: faker.person.fullName({
  //             firstName,
  //             lastName,
  //           }),
  //           email: faker.internet.email({
  //             firstName,
  //             lastName,
  //             provider: "mukumbo.dev",
  //           }),
  //           sexo: sex,
  //         };
  //         return {
  //           name: Currentclient.name,
  //           email: Currentclient.email,
  //           sexo: Currentclient.sexo,
  //           address: faker.location.streetAddress({
  //             useFullAddress: true,
  //           }),
  //           coordenadas: faker.location.nearbyGPSCoordinate({
  //             origin: [-8.841198, 13.295715],
  //           }),
  //           tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
  //           numberBI: faker.helpers.fromRegExp(
  //             /[^a-zA-Z]{9}[^a-z0-9]{2}[^a-zA-Z]{2}/,
  //           ),
  //           nascimento: faker.date.past({ years: 30 }),
  //           avatar: faker.image.avatar(),
  //         };
  //       }),
  //     },
  //     drivers: {
  //       create: Array.from({ length: driversLength }).map((d) => {
  //         const sex = faker.helpers.enumValue(sexo);
  //         const firstName = faker.person.firstName(
  //           sex === "M" ? "male" : "female",
  //         );
  //         const lastName = faker.person.lastName(
  //           sex === "M" ? "male" : "female",
  //         );
  //         const currentDriver = {
  //           name: faker.person.fullName({
  //             firstName,
  //             lastName,
  //           }),
  //           email: faker.internet.email({
  //             firstName,
  //             lastName,
  //             provider: "mukumbo.dev",
  //           }),
  //           sexo: sex,
  //         };
  //         return {
  //           name: currentDriver.name,
  //           email: currentDriver.email,
  //           sexo: currentDriver.sexo,
  //           coordenadas: faker.location.nearbyGPSCoordinate({
  //             origin: [-8.841198, 13.295715],
  //           }),
  //           tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
  //           numberBI: faker.helpers.fromRegExp(
  //             /[^a-zA-Z]{9}[^a-z0-9]{2}[^a-zA-Z]{2}/,
  //           ),
  //           nascimento: faker.date.past({ years: 30 }),
  //           avatar: faker.image.avatar(),
  //           veiculo: {
  //             create: {
  //               matricula: faker.helpers
  //                 .fromRegExp(/LD-[0-9]{2}-[0-9]{2}-[^0-9]{2}/)
  //                 .toUpperCase(),
  //             },
  //           },
  //         };
  //       }),
  //     },
  //   },
  // });

  // await db.filial.create({
  //   data: {
  //     name: `Golf 2 ${faker.location.state({
  //       abbreviated: true,
  //     })}`,
  //     tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
  //     address: faker.location.streetAddress({ useFullAddress: true }),
  //     email: "golf2@mukumbo.dev",
  //     coordenadas: [-8.888436, 13.240898],
  //     manager: {
  //       create: {
  //         name: faker.person.fullName(),
  //         email: faker.internet.email(),
  //         tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
  //         avatar: faker.image.avatar(),
  //         sexo: faker.helpers.enumValue(sexo),
  //       },
  //     },
  //     clients: {
  //       create: Array.from({ length: clientsLength }).map((c) => {
  //         const sex = faker.helpers.enumValue(sexo);
  //         const firstName = faker.person.firstName(
  //           sex === "M" ? "male" : "female",
  //         );
  //         const lastName = faker.person.lastName(
  //           sex === "M" ? "male" : "female",
  //         );
  //         const Currentclient = {
  //           name: faker.person.fullName({
  //             firstName,
  //             lastName,
  //           }),
  //           email: faker.internet.email({
  //             firstName,
  //             lastName,
  //             provider: "mukumbo.dev",
  //           }),
  //           sexo: sex,
  //         };
  //         return {
  //           name: Currentclient.name,
  //           email: Currentclient.email,
  //           sexo: Currentclient.sexo,
  //           address: faker.location.streetAddress({
  //             useFullAddress: true,
  //           }),
  //           coordenadas: faker.location.nearbyGPSCoordinate({
  //             origin: [-8.888436, 13.240898],
  //           }),
  //           tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
  //           numberBI: faker.helpers.fromRegExp(
  //             /[^a-zA-Z]{9}[^a-z0-9]{2}[^a-zA-Z]{2}/,
  //           ),
  //           nascimento: faker.date.past({ years: 30 }),
  //           avatar: faker.image.avatar(),
  //         };
  //       }),
  //     },
  //     drivers: {
  //       create: Array.from({ length: driversLength }).map((d) => {
  //         const sex = faker.helpers.enumValue(sexo);
  //         const firstName = faker.person.firstName(
  //           sex === "M" ? "male" : "female",
  //         );
  //         const lastName = faker.person.lastName(
  //           sex === "M" ? "male" : "female",
  //         );
  //         const currentDriver = {
  //           name: faker.person.fullName({
  //             firstName,
  //             lastName,
  //           }),
  //           email: faker.internet.email({
  //             firstName,
  //             lastName,
  //             provider: "mukumbo.dev",
  //           }),
  //           sexo: sex,
  //         };
  //         return {
  //           name: currentDriver.name,
  //           email: currentDriver.email,
  //           sexo: currentDriver.sexo,
  //           coordenadas: faker.location.nearbyGPSCoordinate({
  //             origin: [-8.888436, 13.240898],
  //           }),
  //           tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
  //           numberBI: faker.helpers.fromRegExp(
  //             /[^a-zA-Z]{9}[^a-z0-9]{2}[^a-zA-Z]{2}/,
  //           ),
  //           nascimento: faker.date.past({ years: 30 }),
  //           avatar: faker.image.avatar(),
  //           veiculo: {
  //             create: {
  //               matricula: faker.helpers
  //                 .fromRegExp(/LD-[0-9]{2}-[0-9]{2}-[^0-9]{2}/)
  //                 .toUpperCase(),
  //             },
  //           },
  //         };
  //       }),
  //     },
  //   },
  // });

  // await db.filial.create({
  //   data: {
  //     name: "Vila alice",
  //     tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
  //     address: faker.location.streetAddress({ useFullAddress: true }),
  //     email: "vilaalice@mukumbo.dev",
  //     coordenadas: [-8.825587, 13.247704],
  //     manager: {
  //       create: {
  //         name: faker.person.fullName(),
  //         email: faker.internet.email(),
  //         tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
  //         avatar: faker.image.avatar(),
  //         sexo: faker.helpers.enumValue(sexo),
  //       },
  //     },
  //     clients: {
  //       create: Array.from({ length: clientsLength }).map((c) => {
  //         const sex = faker.helpers.enumValue(sexo);
  //         const firstName = faker.person.firstName(
  //           sex === "M" ? "male" : "female",
  //         );
  //         const lastName = faker.person.lastName(
  //           sex === "M" ? "male" : "female",
  //         );
  //         const Currentclient = {
  //           name: faker.person.fullName({
  //             firstName,
  //             lastName,
  //           }),
  //           email: faker.internet.email({
  //             firstName,
  //             lastName,
  //             provider: "mukumbo.dev",
  //           }),
  //           sexo: sex,
  //         };
  //         return {
  //           name: Currentclient.name,
  //           email: Currentclient.email,
  //           sexo: Currentclient.sexo,
  //           address: faker.location.streetAddress({
  //             useFullAddress: true,
  //           }),
  //           coordenadas: faker.location.nearbyGPSCoordinate({
  //             origin: [-8.825587, 13.247704],
  //           }),
  //           tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
  //           numberBI: faker.helpers.fromRegExp(
  //             /[^a-zA-Z]{9}[^a-z0-9]{2}[^a-zA-Z]{2}/,
  //           ),
  //           nascimento: faker.date.past({ years: 30 }),
  //           avatar: faker.image.avatar(),
  //         };
  //       }),
  //     },
  //     drivers: {
  //       create: Array.from({ length: driversLength }).map((d) => {
  //         const sex = faker.helpers.enumValue(sexo);
  //         const firstName = faker.person.firstName(
  //           sex === "M" ? "male" : "female",
  //         );
  //         const lastName = faker.person.lastName(
  //           sex === "M" ? "male" : "female",
  //         );
  //         const currentDriver = {
  //           name: faker.person.fullName({
  //             firstName,
  //             lastName,
  //           }),
  //           email: faker.internet.email({
  //             firstName,
  //             lastName,
  //             provider: "mukumbo.dev",
  //           }),
  //           sexo: sex,
  //         };
  //         return {
  //           name: currentDriver.name,
  //           email: currentDriver.email,
  //           sexo: currentDriver.sexo,
  //           coordenadas: faker.location.nearbyGPSCoordinate({
  //             origin: [-8.825587, 13.247704],
  //           }),
  //           tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
  //           numberBI: faker.helpers.fromRegExp(
  //             /[^a-zA-Z]{9}[^a-z0-9]{2}[^a-zA-Z]{2}/,
  //           ),
  //           nascimento: faker.date.past({ years: 30 }),
  //           avatar: faker.image.avatar(),
  //           veiculo: {
  //             create: {
  //               matricula: faker.helpers
  //                 .fromRegExp(/LD-[0-9]{2}-[0-9]{2}-[^0-9]{2}/)
  //                 .toUpperCase(),
  //             },
  //           },
  //         };
  //       }),
  //     },
  //   },
  // });

  for (const filial of filias) {
    // const manager = {
    //   name: faker.person.fullName({
    //     firstName,
    //     lastName,
    //   }),
    //   email: faker.internet.email({
    //     firstName,
    //     lastName,
    //     provider: "mukumbo.dev",
    //   }),
    //   sexo: sex,
    // };

    await db.filial.create({
      data: {
        name: filial.name,
        tel: filial.tel,
        address: filial.address,
        email: filial.email,
        coordenadas: filial.coordenadas,
        manager: {
          create: {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
            avatar: faker.image.avatar(),
            sexo: faker.helpers.enumValue(sexo),
          },
        },
        clients: {
          create: Array.from({ length: clientsLength }).map((c) => {
            const sex = faker.helpers.enumValue(sexo);
            const firstName = faker.person.firstName(
              sex === "M" ? "male" : "female",
            );
            const lastName = faker.person.lastName(
              sex === "M" ? "male" : "female",
            );
            const Currentclient = {
              name: faker.person.fullName({
                firstName,
                lastName,
              }),
              email: faker.internet.email({
                firstName,
                lastName,
                provider: "mukumbo.dev",
              }),
              sexo: sex,
            };
            return {
              name: Currentclient.name,
              email: Currentclient.email,
              sexo: Currentclient.sexo,
              address: faker.location.streetAddress({
                useFullAddress: true,
              }),
              coordenadas: faker.location.nearbyGPSCoordinate({
                origin: [filial.coordenadas[0], filial.coordenadas[1]],
              }),
              tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
              numberBI: faker.helpers.fromRegExp(
                /[^a-zA-Z]{9}[^a-z0-9]{2}[^a-zA-Z]{2}/,
              ),
              nascimento: faker.date.past({ years: 30 }),
              avatar: faker.image.avatar(),
            };
          }),
        },
        drivers: {
          create: Array.from({ length: driversLength }).map((d) => {
            const sex = faker.helpers.enumValue(sexo);
            const firstName = faker.person.firstName(
              sex === "M" ? "male" : "female",
            );
            const lastName = faker.person.lastName(
              sex === "M" ? "male" : "female",
            );
            const currentDriver = {
              name: faker.person.fullName({
                firstName,
                lastName,
              }),
              email: faker.internet.email({
                firstName,
                lastName,
                provider: "mukumbo.dev",
              }),
              sexo: sex,
            };
            return {
              name: currentDriver.name,
              email: currentDriver.email,
              sexo: currentDriver.sexo,
              coordenadas: faker.location.nearbyGPSCoordinate({
                origin: [filial.coordenadas[0], filial.coordenadas[1]],
              }),
              tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
              numberBI: faker.helpers.fromRegExp(
                /[^a-zA-Z]{9}[^a-z0-9]{2}[^a-zA-Z]{2}/,
              ),
              nascimento: faker.date.past({ years: 30 }),
              avatar: faker.image.avatar(),
              veiculo: {
                create: {
                  matricula: faker.helpers
                    .fromRegExp(/LD-[0-9]{2}-[0-9]{2}-[^0-9]{2}/)
                    .toUpperCase(),
                },
              },
            };
          }),
        },
      },
    });
  }
  console.log(chalk.yellow("Clients and drivers seeded"));
}
