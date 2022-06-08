import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from 'App/Models/Cliente'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
//import Mail from '@ioc:Adonis/Addons/Mail'

export default class ClientesController {
  public async store({ request, response }: HttpContextContract) {
    const validationSchema = schema.create({
      nome: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(3),
        rules.maxLength(60),
      ]),
      sobrenome: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(3),
        rules.maxLength(60),
      ]),
      fone: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(10),
        rules.maxLength(20),
      ]),
      email: schema.string({ trim: true }, [
        rules.required(),
        rules.unique({ table: 'usuarios', column: 'email' }),
        rules.unique({ table: 'clientes', column: 'email' }),
        rules.email(),
      ]),
      password: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(6),
        rules.maxLength(64),
      ]),
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

    const cliente = await Cliente.create(body)

    response.status(201)

    /*await Mail.send((message) => {
      message
        .from('rajfood2022@hotmail.com', 'RajFood')
        .to(cliente.email)
        .subject('Seja bem- vindo!')
        .text('Seu ID é: ' + cliente.id.toString())
    })*/

    return {
      message: 'Cliente registrado com sucesso!',
      data: cliente,
    }
  }

  public async index() {
    const cliente = await Cliente.all()

    return {
      data: cliente,
    }
  }

  public async show({ params }: HttpContextContract) {
    const cliente = await Cliente.findOrFail(params.id)

    return {
      data: cliente,
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const cliente = await Cliente.findOrFail(params.id)
    await cliente.delete()

    return {
      message: 'Cliente Deletado com sucesso!',
      data: cliente,
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const validationSchema = schema.create({
      nome: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(3),
        rules.maxLength(60),
      ]),
      sobrenome: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(3),
        rules.maxLength(60),
      ]),
      fone: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(10),
        rules.maxLength(20),
      ]),
      email: schema.string({ trim: true }, [
        rules.required(),
        rules.unique({ table: 'usuarios', column: 'email' }),
        rules.unique({ table: 'clientes', column: 'email' }),
        rules.email(),
      ]),
      password: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(6),
        rules.maxLength(64),
      ]),
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

    const cliente = await Cliente.findOrFail(params.id)

    cliente.nome = body.nome
    cliente.sobrenome = body.sobrenome
    cliente.fone = body.fone
    cliente.email = body.email
    cliente.password = body.password

    await cliente.save()

    return {
      message: 'Cliente Atualizado com Sucesso!',
      data: cliente,
    }
  }
}
