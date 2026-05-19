export interface AccessTokenValidator<T> {
  validate: (token: T) => Promise<boolean>
}
