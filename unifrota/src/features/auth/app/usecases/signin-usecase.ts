import type { AccessTokenGenerator } from '#src/features/auth/app/contracts/access-token-generator'
import type { LoadUserByEmail } from '#src/features/auth/app/contracts/load-user-by-email'
import type { PasswordComparer } from '#src/features/auth/app/contracts/password-comparer'
import { InvalidCredentialsError } from '#src/features/auth/app/errors/invalid-credentials-error'

import type { UseCase } from '../../../../shared/contracts/usecase.js'

export type SignInInput = {
  email: string
  password: string
}

export type SignInOutput = {
  accessToken: string
}

export type SignInPayLoad = {
  userId: string
  email: string
}

export type SignInUseCaseInterface = UseCase<SignInInput, SignInOutput>

export class SignInUseCase implements SignInUseCaseInterface {
  constructor(
    private readonly loadUserByEmail: LoadUserByEmail,
    private readonly passwordComparer: PasswordComparer,
    private readonly accessTokenGenerator: AccessTokenGenerator<SignInPayLoad>,
  ) {}

  async execute(input: SignInInput): Promise<SignInOutput> {
    const userAuth = await this.loadUserByEmail.load(input.email)
    if (userAuth === null) {
      throw new InvalidCredentialsError()
    }
    const isPasswordMatch = await this.passwordComparer.compare(input.password, userAuth.passwordHash)
    if (!isPasswordMatch) {
      throw new InvalidCredentialsError()
    }
    const payLoad = {
      userId: userAuth.userId,
      email: userAuth.email,
    }
    const accessToken = await this.accessTokenGenerator.generate(payLoad)
    return {
      accessToken,
    }
  }
}
