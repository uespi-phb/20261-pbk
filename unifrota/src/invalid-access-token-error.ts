import { ApplicationError } from '#src/application-error'

export class InvalidAccessTokenError extends ApplicationError {
  constructor(message: string = 'Invalid access token') {
    super(message, 'INVALID_ACCESS_TOKEN')
  }
}
