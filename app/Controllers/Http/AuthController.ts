import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from 'App/Models/Cliente'
import Usuario from 'App/Models/Usuario'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const usuario = await Usuario.findBy('email', email)
      const cliente = await Cliente.findBy('email', email)
      let token
      if (usuario) {
        token = await auth.use('api').attempt(email, password, {
          expiresIn: '30mins',
          name: usuario?.serialize().email,
        })
      } else {
        token = await auth.use('apiClient').attempt(email, password, {
          expiresIn: '30mins',
          name: cliente?.serialize().email,
        })
      }

      return { token, user: usuario?.serialize() || cliente?.serialize() }
    } catch {
      return response.badRequest('E-Mail e/ou Senha incorreta')
    }
  }
}
