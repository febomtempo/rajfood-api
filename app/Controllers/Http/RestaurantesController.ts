import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Restaurante from 'App/Models/Restaurante'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class RestaurantesController {
  public async store({ request, response }: HttpContextContract) {
    const validationSchema = schema.create({
      id_cliente: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(3),
        rules.maxLength(60),
      ]),
      descricao: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(3),
        rules.maxLength(60),
      ]),
      fone: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(10),
        rules.maxLength(20),
      ]),
      endereco: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(6),
        rules.maxLength(60),
      ]),
      valorEnvio: schema.number([rules.required(), rules.unsigned()]),
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

    const restaurante = await Restaurante.create(body)

    response.status(201)

    return {
      message: 'restaurante registrado com sucesso!',
      data: restaurante,
    }
  }

  public async index() {
    const restaurante = await Restaurante.all()

    return {
      data: restaurante,
    }
  }

  public async show({ params }: HttpContextContract) {
    const restaurante = await Restaurante.findOrFail(params.id)

    return {
      data: restaurante,
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const restaurante = await Restaurante.findOrFail(params.id)
    await restaurante.delete()

    return {
      message: 'restaurante Deletado com sucesso!',
      data: restaurante,
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const validationSchema = schema.create({
      nome: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(3),
        rules.maxLength(60),
      ]),
      descricao: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(3),
        rules.maxLength(60),
      ]),
      fone: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(10),
        rules.maxLength(20),
      ]),
      endereco: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(6),
        rules.maxLength(60),
      ]),
      aberto: schema.boolean(),
      valorEnvio: schema.number([rules.required(), rules.unsigned()]),
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

    const restaurante = await Restaurante.findOrFail(params.id)

    restaurante.nome = body.nome
    restaurante.descricao = body.descricao
    restaurante.fone = body.fone
    restaurante.endereco = body.endereco
    restaurante.aberto = body.aberto
    restaurante.valorEnvio = body.valorEnvio

    await restaurante.save()

    return {
      message: 'restaurante Atualizado com Sucesso!',
      data: restaurante,
    }
  }
}
