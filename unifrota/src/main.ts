/* eslint-disable no-console */
import 'dotenv/config'

const appName = process.env['APP_NAME'] ?? 'template-ts'
const port = process.env['APP_PORT'] ?? '3030'
const nodeEnv = process.env['NODE_ENV'] ?? 'dev'

const bootstrap = (): void => {
  console.log(`[${appName}] starting application`)
  console.log(`Environment: ${nodeEnv}`)
  console.log(`Port: ${port}`)
}

bootstrap()
