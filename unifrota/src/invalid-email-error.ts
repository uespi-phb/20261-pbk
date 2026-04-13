export class InvalidEmailError extends Error {
  constructor(message = 'Invalid e-mail') {
    super(message)
  }
}
