import { AppError } from '#src/features/signin/domain/errors/app-error'

export class InvalidCredentialsError extends AppError {
  public constructor(message: string = 'Invalid user credentials') {
    super(message)
  }
}
