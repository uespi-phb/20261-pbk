import type { MockProxy } from 'vitest-mock-extended'
import { mock } from 'vitest-mock-extended'

import type { LoadAuthUserByEmail } from '#src/signin/application/load-auth-user-by-email'
import type { PasswordComparer } from '#src/signin/application/password-comparer'
import {
  SignInUseCase,
  type SignInInput,
  type SignInOutput,
} from '#src/signin/application/signin-usecase'
import type { AuthUser } from '#src/signin/domain/auth-user'
import { InvalidCredentialsError } from '#src/signin/domain/errors/invalid-credentials-error'

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
