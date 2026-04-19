import type { LoadAuthUserByEmail } from './load-auth-user-by-email'
import type { PasswordComparer } from './password-comparer'
import { InvalidCredentialsError } from '../domain/errors/invalid-credentials-error'

export type SignInInput = {
  email: string
  password: string
}

export type SignInOutput = {
  accessToken: string
}

export class SignInUseCase {
  public constructor(
    private readonly loadAuthUserByEmail: LoadAuthUserByEmail,
    private readonly passwordComparer: PasswordComparer,
  ) {}

  public async execute(input: SignInInput): Promise<SignInOutput> {
    const authUser = await this.loadAuthUserByEmail.load(input.email)
    if (authUser === null) {
      throw new InvalidCredentialsError()
    }

    await this.passwordComparer.compare(input.password, authUser.passwordHash)

    return {
      accessToken: 'any_access_token',
    }
  }
}
