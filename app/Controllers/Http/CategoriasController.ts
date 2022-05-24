import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Categoria from 'App/Models/Categoria'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
export default class categoriasController {
  public async store({ request, response }: HttpContextContract) {
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

    const categoria = await Categoria.create(body)

    response.status(201)

    return {
      message: 'categoria registrado com sucesso!',
      data: categoria,
    }
  }

  public async index() {
    const categoria = await Categoria.all()

    return {
      data: categoria,
    }
  }

  public async show({ params }: HttpContextContract) {
    const categoria = await Categoria.findOrFail(params.id)

    return {
      data: categoria,
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const categoria = await Categoria.findOrFail(params.id)
    await categoria.delete()

    return {
      message: 'categoria Deletado com sucesso!',
      data: categoria,
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

    const categoria = await Categoria.findOrFail(params.id)

    categoria.nome = body.nome
    categoria.descricao = body.descricao

    await categoria.save()

    return {
      message: 'categoria Atualizado com Sucesso!',
      data: categoria,
    }
  }
}
