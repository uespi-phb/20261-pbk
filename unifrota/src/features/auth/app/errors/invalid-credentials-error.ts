import { ApplicationError } from '#src/shared/errors/application-error'

export class InvalidCredentialsError extends ApplicationError {
  constructor(message: string = 'Invalid credentials') {
    super(message, 'INVALID_CREDENTIALS')
  }
}
