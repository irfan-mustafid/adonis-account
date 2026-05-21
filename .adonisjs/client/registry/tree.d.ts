/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    login: typeof routes['auth.login']
    authenticate: typeof routes['auth.authenticate']
    logout: typeof routes['auth.logout']
  }
  home: typeof routes['home']
}
