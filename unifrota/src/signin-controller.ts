import type { Controller, Request, Response } from '#src/controller'
import type { SignInInput, SignInOutput } from '#src/signin-usecase'

export type SignInPayload = SignInInput
export type SignInResult = SignInOutput

export class SignInControler implements Controller<SignInPayload, SignInResult> {
  async handle(request: Request<SignInInput>): Promise<Response<SignInOutput>> {
    await this.validate(request.body)
    return { statusCode: 200 }
  }
  async validate(_input?: SignInInput): Promise<void> {}
}
