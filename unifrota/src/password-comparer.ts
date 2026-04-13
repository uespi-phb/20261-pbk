export interface PasswordComparer {
  compare: (plainPassword: string, hashedPassword: string) => Promise<boolean>
}
