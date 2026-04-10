import type { MockProxy } from 'vitest-mock-extended'
import { mock } from 'vitest-mock-extended'

type SignInInput = {
  email: string
  password: string
}

export type SignInOutput = {
  accessToken: string
}

type AuthUser = {
  userId: string
  email: string
  passwordHash: string
}

interface LoadAuthUserByEmail {
  load: (email: string) => Promise<AuthUser | null>
}

interface PasswordComparer {
  compare: (plainPassword: string, hashedPassword: string) => Promise<boolean>
}

class SignInUseCase {
  constructor(
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

export abstract class AppError extends Error {
  protected constructor(message: string, options?: ErrorOptions) {
    super(message, options)
    this.name = new.target.name
    Error.captureStackTrace(this, new.target)
  }
}

export class InvalidCredentialsError extends AppError {
  public constructor(message: string = 'Invalid user credentials') {
    super(message)
  }
}

describe('SignInUseCase', () => {
  let sutInput: SignInInput
  let sutOutput: SignInOutput
  let authUser: AuthUser
  let loadAuthUserByEmailSpy: MockProxy<LoadAuthUserByEmail>
  let passwordComparerSpy: MockProxy<PasswordComparer>
  let sut: SignInUseCase

  beforeEach(() => {
    sutInput = {
      email: 'john.doe@email.com',
      password: 'any_password',
    }
    sutOutput = {
      accessToken: 'any_access_token',
    }
    authUser = {
      userId: 'any_id',
      email: sutInput.email,
      passwordHash: 'hashed_password',
    }
    loadAuthUserByEmailSpy = mock<LoadAuthUserByEmail>()
    loadAuthUserByEmailSpy.load.mockResolvedValue(authUser)
    passwordComparerSpy = mock<PasswordComparer>()
    passwordComparerSpy.compare.mockResolvedValue(true)
    sut = new SignInUseCase(loadAuthUserByEmailSpy, passwordComparerSpy)
  })

  it('Should call LoadAuthUserByEmail with correct e-mail', async () => {
    await sut.execute(sutInput)

    expect(loadAuthUserByEmailSpy.load).toHaveBeenCalledWith(sutInput.email)
    expect(loadAuthUserByEmailSpy.load).toHaveBeenCalledOnce()
  })

  it('Should complete successfully if user is found by e-mail', async () => {
    const output = await sut.execute(sutInput)

    expect(output).toStrictEqual(sutOutput)
  })

  it('Should rethrow with same error if LoadAuthUserByEmail throws', async () => {
    const error = new Error('any_error')
    loadAuthUserByEmailSpy.load.mockRejectedValueOnce(error)

    await expect(sut.execute(sutInput)).rejects.toBe(error)
  })

  it('Should throw InvalidCredentialsError if user is not found by e-mail', async () => {
    loadAuthUserByEmailSpy.load.mockResolvedValueOnce(null)
    await expect(sut.execute(sutInput)).rejects.toThrow(InvalidCredentialsError)
  })

  it('Should not call if PasswordComparer if user is not found by e-mail', async () => {
    loadAuthUserByEmailSpy.load.mockResolvedValueOnce(null)

    await expect(sut.execute(sutInput)).rejects.toThrow(InvalidCredentialsError)

    expect(passwordComparerSpy.compare).not.toHaveBeenCalled()
  })

  it('Should call if PasswordComparer with plain and hashed password', async () => {
    await sut.execute(sutInput)

    expect(passwordComparerSpy.compare).toHaveBeenCalledWith(sutInput.password, authUser.passwordHash)
    expect(passwordComparerSpy.compare).toHaveBeenCalledOnce()
  })
})
