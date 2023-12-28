import { fakerPT_BR as faker } from "@faker-js/faker";

// console.log(faker.helpers.fromRegExp(/[0-9]{1}/));
setInterval(() => console.log(faker.helpers.fromRegExp(/[0-5]{1}/)), 200);

// setInterval(() => console.log(faker.helpers.fromRegExp(/[0 - 6]/)), 200);
