import { ApplicationError } from './application-error'

export class InvalidCredentialsError extends ApplicationError {
  constructor(message: string = 'Invalid credentials error') {
    super(message, 'INVALID_CREDENTIALS')
  }
}
