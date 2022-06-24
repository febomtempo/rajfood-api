import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Acl {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>,
    allowedRoles: string
  ) {
    const user = await auth.authenticate()
    console.log('AUTENTICADO')

    if (!allowedRoles.includes(user.role)) {
      console.log('NÃO AUTORIZADO')
      return response.unauthorized('Página não autorizada para usuário do tipo ' + user.role)
    }
    console.log('AUTORIZADO')
    await next()
  }
}
