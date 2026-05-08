import jwt from 'jsonwebtoken'

import type { AccessTokenGenerator } from '#src/access-token-generator'
import type { AccessTokenValidator } from '#src/access-token-validator'
import { JwtAdapterError } from '#src/jwt-adapter-error'

export class JwtAdapter implements AccessTokenValidator<string>, AccessTokenGenerator<object> {
  constructor(private readonly secret: string) {}

  async generate(payload: object): Promise<string> {
    return jwt.sign(payload, this.secret)
  }

  async validate(token: string): Promise<boolean> {
    try {
      jwt.verify(token, this.secret)
    } catch {
      throw new JwtAdapterError('invalid token', 'JWT_INVALID_TOKEN')
    }
    return true
  }
}
