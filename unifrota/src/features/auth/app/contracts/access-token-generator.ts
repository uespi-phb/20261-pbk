export interface AccessTokenGenerator<T> {
  generate: (payload: T) => Promise<string>
}
