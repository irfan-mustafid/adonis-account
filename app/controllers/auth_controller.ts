import { type HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import logger from '@adonisjs/core/services/logger'
import crypto from 'node:crypto'

export default class AuthController {
  async create({ inertia }: HttpContext) {
    return inertia.render('auth/pages/login', {})
  }

  async login({ auth, request, response, session }: HttpContext) {
    const username = request.input('username')
    const password = request.input('password')

    if (!username || !password) {
      return response.badRequest({ message: 'Username dan password wajib diisi' })
    }

    try {
      const user = await User.findBy('username', username)
      console.log(user)

      if (!user) {
        throw new Error('User not found')
      }

      const isMD5 = user.password.length === 32 && /^[a-f0-9]+$/.test(user.password)
      let isPasswordValid = false

      if (isMD5) {
        const md5Hash = crypto.createHash('md5').update(password).digest('hex')
        isPasswordValid = md5Hash === user.password

        if (isPasswordValid) {
          user.password = await hash.make(password)
          await user.save()
          logger.info({ username: user.username }, 'Migrated password from MD5 to scrypt')
        }
      } else {
        const userVerified = await User.verifyCredentials(username, password)
        isPasswordValid = !!userVerified
      }

      if (!isPasswordValid) {
        throw new Error('Invalid credentials')
      }

      await auth.use('web').login(user)

      // balikin JSON biasa, bukan redirect
      return response.ok({ message: 'Login berhasil' })
    } catch (error) {
      logger.warn({ username, error: (error as Error).message }, 'Failed login attempt')

      return response.unauthorized({ message: 'Username atau password salah' })
    }
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('auth.login')
  }
}
