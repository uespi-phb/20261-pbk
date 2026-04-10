export type SignInInput = {
  email: string
  password: string
}

export type SignInOutput = {
  accessToken: string
}

export type SignInPayLoad = {
  userId: string
  email: string
}

export type AuthUser = {
  userId: string
  email: string
  passwordHash: string
}

export interface LoadUserByEmail {
  // load(userEmail: string): void
  load: (userEmail: string) => Promise<AuthUser | null>
}

export interface PasswordComparer {
  compare: (plainPassword: string, hashedPassword: string) => Promise<boolean>
}

export interface AccessTokenGenerator<T> {
  generate: (payload: T) => Promise<string>
}

export class SignInUseCase {
  constructor(
    private readonly loadUserByEmail: LoadUserByEmail,
    private readonly passwordComparer: PasswordComparer,
    private readonly accessTokenGenerator: AccessTokenGenerator<SignInPayLoad>,
  ) {}

  async execute(input: SignInInput): Promise<SignInOutput> {
    const userAuth = await this.loadUserByEmail.load(input.email)
    if (userAuth === null) {
      throw new InvalidCredentialsError()
    }
    const isPasswordMatch = await this.passwordComparer.compare(input.password, userAuth.passwordHash)
    if (!isPasswordMatch) {
      throw new InvalidCredentialsError()
    }
    const payLoad = {
      userId: userAuth.userId,
      email: userAuth.email,
    }
    const accessToken = await this.accessTokenGenerator.generate(payLoad)
    return {
      accessToken,
    }
  }
}

export class InvalidCredentialsError extends Error {
  constructor(message: string = 'Invalid credentials error') {
    super(message)
  }
}
