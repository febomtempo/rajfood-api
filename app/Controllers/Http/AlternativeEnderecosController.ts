import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Endereco from 'App/Models/Endereco'

export default class EnderecosController {
  public async show({ params }: HttpContextContract) {
    const endereco = await Endereco.findByOrFail('id_cliente', params.id)
    return {
      data: endereco,
    }
  }
}
