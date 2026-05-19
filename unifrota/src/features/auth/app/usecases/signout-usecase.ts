import type { UseCase } from '../../../../shared/contracts/usecase.js'
import type { AccessTokenValidator } from '../contracts/access-token-validator.js'
import { InvalidAccessTokenError } from '../errors/invalid-access-token-error.js'

export type SignOutInput = { accessToken: string }
export type SignOutOutput = { result: boolean }

export class SignOutUseCase implements UseCase<SignOutInput, SignOutOutput> {
  constructor(private readonly accessTokenValidator: AccessTokenValidator<string>) {}

  async execute(input: SignOutInput): Promise<SignOutOutput> {
    if (!input.accessToken) {
      const value = input.accessToken === '' ? 'empty' : input.accessToken
      throw new InvalidAccessTokenError(`Invalid access token: ${value}`)
    }
    const result = await this.accessTokenValidator.validate(input.accessToken)
    return {
      result,
    }
  }
}
