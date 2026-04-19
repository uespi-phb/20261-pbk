import { AppError } from './app-error'

export class InvalidCredentialsError extends AppError {
  public constructor(message: string = 'Invalid user credentials') {
    super(message)
  }
}
