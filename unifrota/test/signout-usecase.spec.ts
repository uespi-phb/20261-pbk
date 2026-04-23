import { mock } from 'vitest-mock-extended'

import type { AccessTokenValidator } from '#src/access-token-validator'
import { SignOutUseCase } from '#src/signout-usecase'

describe('SignOutUseCase', () => {
  test('Should return success when sign out is requested', async () => {
    const input = { accessToken: 'any_token' }
    const output = { result: true }
    const accessTokenValidator = mock<AccessTokenValidator<string>>()

    const sut = new SignOutUseCase(accessTokenValidator)

    const result = await sut.execute(input)

    expect(result).toStrictEqual(output)
  })

  test('Should call AccessTokenValidator to validate access token', async () => {
    const input = { accessToken: 'any_token' }
    const accessTokenValidator = mock<AccessTokenValidator<string>>()
    const sut = new SignOutUseCase(accessTokenValidator)

    await sut.execute(input)

    expect(accessTokenValidator.validate).toHaveBeenCalledWith(input.accessToken)
  })
})
