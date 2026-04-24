import jwt from 'jsonwebtoken'
import { vi } from 'vitest'

import { JwtAdapter } from '#src/jwt-adapter'

vi.mock('jsonwebtoken')

describe('JwtAdapter', () => {
  let payload: object
  let secret: string
  let accessToken: string
  let sut: JwtAdapter

  const mockedJwt = vi.mocked(jwt)

  beforeEach(() => {
    payload = { id: 123, email: 'john.doe@email.com' }
    secret = 'any_secret'
    accessToken = jwt.sign(payload, secret)
    sut = new JwtAdapter()
  })

  it('Should return true when token is valid', async () => {
    const result = await sut.validate(accessToken)

    expect(result).toBe(true)
  })

  it('Should validate token using JsonWebToken and configured secret', async () => {
    await sut.validate(accessToken)

    expect(mockedJwt.verify).toHaveBeenCalled()
  })
})
