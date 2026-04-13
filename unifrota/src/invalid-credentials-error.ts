export class InvalidCredentialsError extends Error {
  constructor(message: string = 'Invalid credentials error') {
    super(message)
  }
}
