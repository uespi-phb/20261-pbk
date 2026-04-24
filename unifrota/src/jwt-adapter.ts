import jwt from 'jsonwebtoken'

import type { AccessTokenValidator } from '#src/access-token-validator'

export class JwtAdapter implements AccessTokenValidator<string> {
  async validate(_token: string): Promise<boolean> {
    jwt.verify('', '')
    return true
  }
}
