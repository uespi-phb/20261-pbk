export abstract class DomainError extends Error {
  public readonly code: string

  protected constructor(message: string, code: string) {
    super(message)
    this.name = new.target.name
    this.code = code

    Object.setPrototypeOf(this, new.target.prototype)
  }
}
