import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DetalhesPedido from 'App/Models/DetalhesPedido'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class DetalhesPedidosController {
  public async store({ request, response }: HttpContextContract) {
    const validationSchema = schema.create({
      pedidoId: schema.number([rules.required(), rules.exists({ table: 'pedidos', column: 'id' })]),
      produtoId: schema.number([
        rules.required(),
        rules.exists({ table: 'produtos', column: 'id' }),
      ]),
      quantidade: schema.number([rules.required(), rules.unsigned()]),
      valor_total_item: schema.number([rules.required(), rules.unsigned()]),
    })

    const messages = {
      minLength: '{{ field }} deve ter no mínimo {{ options.minLength }} caracteres',
      maxLength: '{{ field }} deve ter no máximo {{ options.maxLength }} caracteres',
      required: '{{ field }} é obrigatório',
      unique: '{{ field }} deve ser único, esse {{ field }} já foi utilizado',
      regex: '{{ field}} deve seguir o padrão: xxx.xxx.xxx-xx onde x = número',
      number: '{{ field }} deve conter um número',
      exists: '{{ field }} deve existir na tabela {{ options.table }}',
    }

    const body = await request.validate({ schema: validationSchema, messages })

    const detalhesPedido = await DetalhesPedido.create(body)

    response.status(201)

    return {
      message: 'detalhesPedido registrado com sucesso!',
      data: detalhesPedido,
    }
  }

  public async index() {
    const detalhesPedido = await DetalhesPedido.all()

    return {
      data: detalhesPedido,
    }
  }

  public async show({ params }: HttpContextContract) {
    const detalhesPedido = await DetalhesPedido.findOrFail(params.id)

    return {
      data: detalhesPedido,
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const detalhesPedido = await DetalhesPedido.findOrFail(params.id)
    await detalhesPedido.delete()

    return {
      message: 'detalhesPedido Deletado com sucesso!',
      data: detalhesPedido,
    }
  }
}
