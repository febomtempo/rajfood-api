import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UsuariosController {
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

    const usuario = await Usuario.create(body)

    response.status(201)

    return {
      message: 'usuario registrado com sucesso!',
      data: usuario,
    }
  }

  public async index() {
    const usuario = await Usuario.all()

    return {
      data: usuario,
    }
  }

  public async show({ params }: HttpContextContract) {
    const usuario = await Usuario.findOrFail(params.id)

    return {
      data: usuario,
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const usuario = await Usuario.findOrFail(params.id)
    await usuario.delete()

    return {
      message: 'usuario Deletado com sucesso!',
      data: usuario,
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
      email: schema.string({ trim: true }, [rules.required(), rules.email()]),
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

    const usuario = await Usuario.findOrFail(params.id)

    usuario.nome = body.nome
    usuario.sobrenome = body.sobrenome
    usuario.fone = body.fone
    usuario.email = body.email

    await usuario.save()

    return {
      message: 'usuario Atualizado com Sucesso!',
      data: usuario,
    }
  }
}
