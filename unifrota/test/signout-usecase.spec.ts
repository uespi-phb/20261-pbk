import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { mock, type MockProxy } from 'vitest-mock-extended'

import type { AccessTokenValidator } from '#src/access-token-validator'
import { InvalidAccessTokenError } from '#src/invalid-access-token-error'
import { SignOutUseCase, type SignOutInput, type SignOutOutput } from '#src/signout-usecase'

describe('SignOutUseCase', () => {
  let input: SignOutInput
  let output: SignOutOutput
  let accessTokenValidator: MockProxy<AccessTokenValidator<string>>
  let sut: SignOutUseCase

  beforeEach(() => {
    input = { accessToken: 'any_valid_token' }
    output = { result: true }
    accessTokenValidator = mock<AccessTokenValidator<string>>()
    accessTokenValidator.validate.mockResolvedValue(output.result)
    sut = new SignOutUseCase(accessTokenValidator)
  })

  describe('Behavioral', () => {
    test('Should validate provided access token and return success', async () => {
      const result = await sut.execute(input)

      expect(result).toStrictEqual(output)
    })

    test('Should not validate invalid provided access token and returning failure', async () => {
      accessTokenValidator.validate.mockResolvedValueOnce(false)

      const result = await sut.execute(input)

      expect(result).toStrictEqual({ result: false })
    })

    test.each(['', null, undefined])(
      'Should throw InvalidAccessTokenError when access token is missing, null or empty: "%s"',
      async (token: unknown) => {
        input = { accessToken: token as string }
        await expect(() => sut.execute(input)).rejects.toThrow(InvalidAccessTokenError)
      },
    )

    test.each(['', null, undefined])(
      'Should throw InvalidAccessTokenError when access token is missing, null or empty: "%s"',
      async (token: unknown) => {
        input = { accessToken: token as string }
        await expect(() => sut.execute(input)).rejects.toThrow(InvalidAccessTokenError)
      },
    )

    test('Should propagate error from AccessTokenValidator', async () => {
      const error = new Error('any_access_token_validator_error')
      accessTokenValidator.validate.mockImplementationOnce(() => {
        throw error
      })

      await expect(() => sut.execute(input)).rejects.toThrow(error.message)
    })
  })

  describe('Architectural', () => {
    test('Should not depend on JwtAdapter directly', async () => {
      const currentDir = dirname(fileURLToPath(import.meta.url))
      const projectRoot = resolve(currentDir, '..')
      const sourcePath = resolve(projectRoot, 'src/signout-usecase.ts')
      const sourceCode = await readFile(sourcePath, 'utf8')

      expect(sourceCode).toContain('AccessTokenValidator')
      expect(sourceCode).not.toContain('JwtAdapter')
    })
  })
})
