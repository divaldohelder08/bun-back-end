export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized.");
  }
}

export class NotAManagerError extends Error {
  constructor() {
    super("Usuário não é gerente de uma filial.");
  }
}
