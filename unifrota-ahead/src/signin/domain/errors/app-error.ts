export abstract class AppError extends Error {
  protected constructor(message: string, options?: ErrorOptions) {
    super(message, options)
    this.name = new.target.name
    Error.captureStackTrace(this, new.target)
  }
}
