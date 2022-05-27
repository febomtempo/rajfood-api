import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Endereco from 'App/Models/Endereco'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class EnderecosController {
  public async store({ request, response }: HttpContextContract) {
    const validationSchema = schema.create({
      id_cliente: schema.number([
        rules.required(),
        rules.exists({ table: 'clientes', column: 'id' }),
      ]),
      descricao: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(3),
        rules.maxLength(30),
      ]),
      cep: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(9),
        rules.maxLength(9),
      ]),
      rua: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(3),
        rules.maxLength(60),
      ]),
      bairro: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(3),
        rules.maxLength(60),
      ]),
      cidade: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(3),
        rules.maxLength(60),
      ]),
      estado: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(2),
        rules.maxLength(30),
      ]),

      numero: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(1),
        rules.maxLength(20),
      ]),

      complemento: schema.string.optional({ trim: true }, [rules.maxLength(60)]),
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

    const endereco = await Endereco.create(body)

    response.status(201)

    return {
      message: 'Endereco registrado com sucesso!',
      data: endereco,
    }
  }

  public async index() {
    const endereco = await Endereco.all()

    return {
      data: endereco,
    }
  }

  public async show({ params }: HttpContextContract) {
    const endereco = await Endereco.findOrFail(params.id)

    return {
      data: endereco,
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const endereco = await Endereco.findOrFail(params.id)
    await endereco.delete()

    return {
      message: 'Endereco Deletado com sucesso!',
      data: endereco,
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const validationSchema = schema.create({
      id_cliente: schema.number([
        rules.required(),
        rules.exists({ table: 'clientes', column: 'id' }),
      ]),
      descricao: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(3),
        rules.maxLength(30),
      ]),
      cep: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(9),
        rules.maxLength(9),
      ]),
      rua: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(3),
        rules.maxLength(60),
      ]),
      bairro: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(3),
        rules.maxLength(60),
      ]),
      cidade: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(3),
        rules.maxLength(60),
      ]),
      estado: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(2),
        rules.maxLength(30),
      ]),

      numero: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(1),
        rules.maxLength(20),
      ]),

      complemento: schema.string({ trim: true }, [rules.maxLength(60)]),
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

    const endereco = await Endereco.findOrFail(params.id)

    endereco.id_cliente = body.id_cliente
    endereco.descricao = body.descricao
    endereco.cep = body.cep
    endereco.rua = body.rua
    endereco.bairro = body.bairro
    endereco.cidade = body.cidade
    endereco.estado = body.estado
    endereco.numero = body.numero
    endereco.complemento = body.complemento

    await endereco.save()

    return {
      message: 'Endereco Atualizado com Sucesso!',
      data: endereco,
    }
  }
}
