import { InfraError } from '#src/shared/errors/infra-error'

export class JwtAdapterError extends InfraError {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(message: string, code: string) {
    super(message, code)
  }
}
