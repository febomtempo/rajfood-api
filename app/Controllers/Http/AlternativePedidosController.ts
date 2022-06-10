import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pedido from 'App/Models/Pedido'

export default class AlternativePedidosController {
  public async show({ params }: HttpContextContract) {
    const pedido = await Pedido.query().where('id_cliente', params.id)

    return {
      data: pedido,
    }
  }
}
