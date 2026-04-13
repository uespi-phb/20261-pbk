import type { AccessTokenGenerator } from './access-token-generator'
import { InvalidCredentialsError } from './invalid-credentials-error'
import type { LoadUserByEmail } from './load-user-by-email'
import type { PasswordComparer } from './password-comparer'

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

export class SignInUseCase {
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
