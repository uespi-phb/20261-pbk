declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV?: 'dev' | 'test' | 'prod'
    readonly APP_NAME?: string
    readonly APP_PORT?: string
  }
}
