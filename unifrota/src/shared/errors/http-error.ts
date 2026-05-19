import { InfraError } from '#src/shared/errors/infra-error'

export abstract class HttpError extends InfraError {
  public readonly statusCode: number

  constructor(message: string, code: string, statusCode: number) {
    super(message, code)
    this.statusCode = statusCode
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string = 'Bad request') {
    super(message, 'BAD_REQUEST', 400)
  }
}
