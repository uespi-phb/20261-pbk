import type { AccessTokenValidator } from './access-token-validator.js'
import type { UseCase } from './usecase.js'

export type SignOutInput = { accessToken: string }
export type SignOutOutput = { result: boolean }

export class SignOutUseCase implements UseCase<SignOutInput, SignOutOutput> {
  constructor(private readonly accessTokenValidator: AccessTokenValidator<string>) {}

  async execute(input: SignOutInput): Promise<SignOutOutput> {
    await this.accessTokenValidator.validate(input.accessToken)
    return {
      result: true,
    }
  }
}
