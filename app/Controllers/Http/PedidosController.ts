import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pedido from 'App/Models/Pedido'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Mail from '@ioc:Adonis/Addons/Mail'

let statusPedido = (num: number): string => {
  let status
  switch (num) {
    case 0:
      status = 'Pedido Cancelado'
      break
    case 1:
      status = 'Pedido em Produção'
      break
    case 2:
      status = 'Pedido saiu para Entrega'
      break
    case 3:
      status = 'Pedido Entregue'
      break
  }
  return status
}

export default class PedidosController {
  public async store({ request, response }: HttpContextContract) {
    const validationSchema = schema.create({
      id_cliente: schema.number([
        rules.required(),
        rules.exists({ table: 'clientes', column: 'id' }),
      ]),
      id_restaurante: schema.number([
        rules.required(),
        rules.exists({ table: 'restaurantes', column: 'id' }),
      ]),
      id_endereco: schema.number([
        rules.required(),
        rules.exists({ table: 'enderecos', column: 'id' }),
      ]),
      total: schema.number([rules.required(), rules.unsigned()]),
      forma_pagamento: schema.number([rules.required(), rules.unsigned()]),
      troco: schema.number([rules.required(), rules.unsigned()]),
    })

    const messages = {
      minLength: '{{ field }} deve ter no mínimo {{ options.minLength }} caracteres',
      maxLength: '{{ field }} deve ter no máximo {{ options.maxLength }} caracteres',
      required: '{{ field }} é obrigatório',
      unique: '{{ field }} deve ser único, esse {{ field }} já foi utilizado',
      regex: '{{ field}} deve seguir o padrão: xxx.xxx.xxx-xx onde x = número',
      number: '{{ field }} deve conter um número',
      exists: '{{ field }} deve existir na tabela {{ options.table }}',
      unsigned: '{{ field }} deve possuir um número sem sinal',
    }

    const body = await request.validate({ schema: validationSchema, messages })

    const pedido = await Pedido.create(body)

    response.status(201)

    await Mail.sendLater((message) => {
      message
        .from('rajfood2022@hotmail.com', 'RajFood')
        .to('rajfood2022@hotmail.com')
        .subject('Acompanhamento de Status do Pedido #' + pedido.id.toString())
        .text(
          'Seu pedido já foi efetuado!!!\n\nO status do pedido #' +
            pedido.id.toString() +
            ' é: \n\n' +
            'Pedido em Produção'
        )
    })

    return {
      message: 'Pedido registrado com sucesso!',
      data: pedido,
    }
  }

  public async index() {
    const pedido = await Pedido.all()

    return {
      data: pedido,
    }
  }

  public async show({ params }: HttpContextContract) {
    const pedido = await Pedido.findOrFail(params.id)
    return {
      data: pedido,
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const pedido = await Pedido.findOrFail(params.id)
    await pedido.delete()

    return {
      message: 'Pedido Deletado com sucesso!',
      data: pedido,
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const validationSchema = schema.create({
      id_cliente: schema.number([
        rules.required(),
        rules.exists({ table: 'clientes', column: 'id' }),
      ]),
      id_restaurante: schema.number([
        rules.required(),
        rules.exists({ table: 'restaurantes', column: 'id' }),
      ]),
      id_endereco: schema.number([
        rules.required(),
        rules.exists({ table: 'enderecos', column: 'id' }),
      ]),
      total: schema.number([rules.required(), rules.unsigned()]),
      forma_pagamento: schema.number([rules.required(), rules.unsigned()]),
      troco: schema.number([rules.required(), rules.unsigned()]),
      status: schema.number([rules.required(), rules.unsigned()]),
    })

    const messages = {
      minLength: '{{ field }} deve ter no mínimo {{ options.minLength }} caracteres',
      maxLength: '{{ field }} deve ter no máximo {{ options.maxLength }} caracteres',
      required: '{{ field }} é obrigatório',
      unique: '{{ field }} deve ser único, esse {{ field }} já foi utilizado',
      regex: '{{ field}} deve seguir o padrão: xxx.xxx.xxx-xx onde x = número',
      number: '{{ field }} deve conter um número',
      exists: '{{ field }} deve existir na tabela {{ options.table }}',
      unsigned: '{{ field }} deve possuir um número sem sinal',
    }

    const body = await request.validate({ schema: validationSchema, messages })

    const pedido = await Pedido.findOrFail(params.id)

    pedido.id_cliente = body.id_cliente
    pedido.id_restaurante = body.id_restaurante
    pedido.id_endereco = body.id_endereco
    pedido.total = body.total
    pedido.forma_pagamento = body.forma_pagamento
    pedido.troco = body.troco
    pedido.status = body.status

    await pedido.save()

    await Mail.sendLater((message) => {
      message
        .from('rajfood2022@hotmail.com', 'RajFood')
        .to('rajfood2022@hotmail.com')
        .subject('Atualização de Status do Pedido #' + pedido.id.toString())
        .text(
          'O status do seu pedido foi atualizado!!!\n\nO novo status do pedido #' +
            pedido.id.toString() +
            ' é: \n\n' +
            statusPedido(pedido.$getAttribute('status'))
        )
    })

    return {
      message: 'Pedido Atualizado com Sucesso!',
      data: pedido,
    }
  }
}
