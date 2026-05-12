export interface Request<Body> {
  body?: Body
}

export interface Response<Body> {
  statusCode: number
  body?: Body
}

export interface Controller<ReqBody, ResBody> {
  handle: (request: Request<ReqBody>) => Promise<Response<ResBody>>
  validate: (input?: ReqBody) => Promise<void>
}
