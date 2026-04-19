import { describe, test, expect, beforeAll } from 'vitest'
import type { MockProxy } from 'vitest-mock-extended'
import { mock } from 'vitest-mock-extended'

import type { AccessTokenGenerator } from '#src/access-token-generator'
import { InvalidCredentialsError } from '#src/invalid-credentials-error'
import type { AuthUser, LoadUserByEmail } from '#src/load-user-by-email'
import type { PasswordComparer } from '#src/password-comparer'
import { SignInUseCase, type SignInInput, type SignInPayLoad } from '#src/signin-usecase'

describe('SignInUseCase', () => {
  let plainPassword: string
  let hashedPassword: string
  let input: SignInInput
  let authUser: AuthUser
  let signInPayLoad: SignInPayLoad
  let accessToken: string
  let loadUserByEmail: MockProxy<LoadUserByEmail>
  let passwordComparer: MockProxy<PasswordComparer>
  let accessTokenGenerator: MockProxy<AccessTokenGenerator<SignInPayLoad>>
  let sut: SignInUseCase

  beforeAll(() => {
    plainPassword = 'any_plain_password'
    hashedPassword = 'any_hashed_password'
    input = {
      email: 'john.doe@email.com',
      password: plainPassword,
    }
    authUser = {
      userId: 'any_user_id',
      email: input.email,
      passwordHash: hashedPassword,
    }
    signInPayLoad = {
      userId: authUser.userId,
      email: authUser.email,
    }

    accessToken = 'any_access_token'
    loadUserByEmail = mock<LoadUserByEmail>()
    loadUserByEmail.load.mockResolvedValue(authUser)
    passwordComparer = mock<PasswordComparer>()
    passwordComparer.compare.mockResolvedValue(true)
    accessTokenGenerator = mock<AccessTokenGenerator<SignInPayLoad>>()
    accessTokenGenerator.generate.mockResolvedValue(accessToken)
    sut = new SignInUseCase(loadUserByEmail, passwordComparer, accessTokenGenerator)
  })

  test('Should call LoadUserByEmail with correct input', async () => {
    // Act
    await sut.execute(input)
    // Assert
    expect(loadUserByEmail.load).toHaveBeenCalledWith(input.email)
    expect(loadUserByEmail.load).toHaveBeenCalledOnce()
  })

  test('Should throws InvalidCredentialsError if user is not found', async () => {
    // Arrange
    loadUserByEmail.load.mockResolvedValueOnce(null)
    // Act
    const promise = sut.execute(input)
    // Assert
    await expect(promise).rejects.toThrow(InvalidCredentialsError)
  })

  test('Should not call PasswordComparer if user is not found', async () => {
    loadUserByEmail.load.mockResolvedValueOnce(null)
    // Act
    await expect(() => sut.execute(input)).rejects.toThrow()
    // Assert
    expect(passwordComparer.compare).not.toHaveBeenCalled()
  })

  test('Should call PasswordComparer if user is loaded by email', async () => {
    // Act
    await sut.execute(input)
    // Assert
    expect(passwordComparer.compare).toHaveBeenCalledWith(plainPassword, hashedPassword)
  })

  test('Should throw InvalidCredentialsError if user password id invalid', async () => {
    // Arrange
    passwordComparer.compare.mockResolvedValueOnce(false)
    // Act / Assert
    await expect(sut.execute(input)).rejects.toThrow(InvalidCredentialsError)
  })

  test("Should not call AccesTokenGenerator if password doesn't match", async () => {
    // Arrange
    passwordComparer.compare.mockResolvedValueOnce(false)
    // Act / Assert
    await expect(sut.execute(input)).rejects.toThrow(InvalidCredentialsError)
    expect(accessTokenGenerator.generate).not.toHaveBeenCalled()
  })

  test('Should call AccesTokenGenerator with correct input if user is successfully authenticated', async () => {
    // Act
    await sut.execute(input)
    // Assert
    expect(accessTokenGenerator.generate).toHaveBeenCalledWith(signInPayLoad)
  })

  test('Should return SignInOutput if user is successfully authenticated', async () => {
    // Act
    const signInOutput = await sut.execute(input)
    // Assert
    expect(signInOutput).toStrictEqual({ accessToken })
  })
})
