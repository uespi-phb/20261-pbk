import { ApplicationError } from '#src/application-error'

export class InvalidCredentialsError extends ApplicationError {
  constructor(message: string = 'Invalid credentials') {
    super(message, 'INVALID_CREDENTIALS')
  }
}
