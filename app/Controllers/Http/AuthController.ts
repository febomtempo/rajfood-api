import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from 'App/Models/Cliente'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const cliente = await Cliente.findBy('email', email)
      let token
      if (cliente) {
        token = await auth.use('api').attempt(email, password, {
          expiresIn: '60mins',
          name: cliente?.serialize().email,
        })
      }
      return { token, user: cliente?.serialize() }
    } catch {
      return response.badRequest('E-Mail e/ou Senha incorreta')
    }
  }
}
