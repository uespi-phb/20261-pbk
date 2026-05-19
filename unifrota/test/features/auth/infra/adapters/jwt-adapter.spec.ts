import jwt from 'jsonwebtoken'

import type { AccessTokenGenerator } from '#src/features/auth/app/contracts/access-token-generator'
import type { AccessTokenValidator } from '#src/features/auth/app/contracts/access-token-validator'
import { JwtAdapter } from '#src/features/auth/infra/adapters/jwt-adapter'
import { JwtAdapterError } from '#src/features/auth/infra/errors/jwt-adapter-error'

describe('JwtAdapter', () => {
  let secret: string
  let accessToken: string
  let payload: object
  let sut: JwtAdapter

  beforeEach(() => {
    secret = 'any_secret'
    payload = { id: 123, name: 'John Doe' }
    accessToken = jwt.sign(payload, secret)
    vi.spyOn(jwt, 'sign')
    vi.spyOn(jwt, 'verify')
    sut = new JwtAdapter(secret)
  })

  describe('generate', () => {
    it('Should return signed access token when payload is provided', async () => {
      const generatedAccessToken = await sut.generate(payload)

      expect(typeof generatedAccessToken).toBe('string')
      expect(generatedAccessToken.length).toBeGreaterThan(0)
    })

    it('Should generate token using JsonWebToken and configured secret', async () => {
      await sut.generate(payload)

      expect(jwt.sign).toHaveBeenCalledWith(payload, secret)
    })

    it('Should return access token that can be validated with the configured secret', async () => {
      const generatedAccessToken = await sut.generate(payload)

      const result = await sut.validate(generatedAccessToken)

      expect(result).toBe(true)
    })

    it('Should conform to AccessTokenGenerator interface', async () => {
      const accessTokenGenerator: AccessTokenGenerator<object> = sut

      const generatedAccessToken = await accessTokenGenerator.generate(payload)

      expect(typeof generatedAccessToken).toBe('string')
    })
  })

  describe('validate', () => {
    it('Should return true when token is valid', async () => {
      const result = await sut.validate(accessToken)

      expect(result).toBe(true)
    })

    it('Should throw JwtAdapterError when token is malformed', async () => {
      accessToken = 'invalid_access_token'

      await expect(() => sut.validate(accessToken)).rejects.toThrow(JwtAdapterError)
    })

    it('Should throw JwtAdapterError when token was signed with another secret', async () => {
      accessToken = jwt.sign(payload, 'another_secret')

      await expect(() => sut.validate(accessToken)).rejects.toThrow(JwtAdapterError)
    })

    it('Should expose infra error code when token validation fails', async () => {
      accessToken = 'invalid_access_token'

      await expect(() => sut.validate(accessToken)).rejects.toHaveProperty('code', 'JWT_INVALID_TOKEN')
    })

    it('Should validate token using JsonWebToken and configured secret', async () => {
      await sut.validate(accessToken)

      expect(jwt.verify).toHaveBeenCalledWith(accessToken, secret)
    })

    it('Should conform to AccessTokenValidator interface', async () => {
      const accessTokenValidator: AccessTokenValidator<string> = sut

      const result = await accessTokenValidator.validate(accessToken)

      expect(result).toBe(true)
    })
  })
})
