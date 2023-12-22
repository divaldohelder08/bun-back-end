export class  EmailNotSendedError
 extends Error {
  constructor() {
    super('User is not a restaurant manager.')
  }
}
