export type AuthUser = {
  userId: string
  email: string
  passwordHash: string
}

export interface LoadUserByEmail {
  // load(userEmail: string): void
  load: (userEmail: string) => Promise<AuthUser | null>
}
