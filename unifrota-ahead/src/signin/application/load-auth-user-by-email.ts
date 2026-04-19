import type { AuthUser } from '../domain/auth-user'

export interface LoadAuthUserByEmail {
  load: (email: string) => Promise<AuthUser | null>
}
