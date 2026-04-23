import type { AuthUser } from '#src/features/signin/domain/auth-user'

export interface LoadAuthUserByEmail {
  load: (email: string) => Promise<AuthUser | null>
}
