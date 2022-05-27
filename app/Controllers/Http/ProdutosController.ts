import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Produto from 'App/Models/Produto'
import cloudinary from 'cloudinary'
import Env from '@ioc:Adonis/Core/Env'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

cloudinary.v2.config({
  cloud_name: Env.get('CLOUD_NAME'),
  api_key: Env.get('API_KEY'),
  api_secret: Env.get('API_SECRET'),
})

export default class ProdutosController {
  private validationOptions = {
    types: ['imagem'],
    size: '2mb',
  }

  public async store({ request, response }: HttpContextContract) {
    const validationSchema = schema.create({
      id_categoria: schema.number([
        rules.required(),
        rules.exists({ table: 'categorias', column: 'id' }),
      ]),
      nome: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(3),
        rules.maxLength(30),
      ]),
      preco: schema.number([rules.required(), rules.unsigned()]),
      descricao: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(3),
        rules.maxLength(60),
      ]),
      image: schema.string.optional(),
    })

    const messages = {
      minLength: '{{ field }} deve ter no mínimo {{ options.minLength }} caracteres',
      maxLength: '{{ field }} deve ter no máximo {{ options.maxLength }} caracteres',
      required: '{{ field }} é obrigatório',
      unique: '{{ field }} deve ser único, esse {{ field }} já foi utilizado',
      regex: '{{ field}} deve seguir o padrão: xxx.xxx.xxx-xx onde x = número',
      number: '{{ field }} deve conter um número',
      exists: '{{ field }} deve existir na tabela {{ options.table }}',
      boolean: '{{ field }} deve ser true ou false, 1 ou 0',
    }

    const body = await request.validate({ schema: validationSchema, messages })

    const imagem = request.file('imagem', this.validationOptions)
    if (imagem) {
      const tmpPath = imagem.tmpPath || ''
      try {
        const result = await cloudinary.v2.uploader.upload(tmpPath)
        body.image = result?.url
      } catch {
        throw new Exception('Duro golpe, o upload de imagem falhou!')
        body.image =
          'https://res.cloudinary.com/rajfood/image/upload/v1653433375/TKQZGZF_nmrmha.jpg'
      }
    }

    const produto = await Produto.create(body)

    response.status(201)

    return {
      message: 'produto registrado com sucesso!',
      data: produto,
    }

    /*if(image){
          await image.moveToDisk('rajfood')
        }*/

    /* if(image){
          const imageName = `${uuidv4()}.${image.extname}`
    
          await image.move(Application.tmpPath('uploads'), {
            name: imageName
          })
    
          body.image = imageName
        } */
  }

  public async index() {
    const produto = await Produto.all()

    return {
      data: produto,
    }
  }

  public async show({ params }: HttpContextContract) {
    const produto = await Produto.findOrFail(params.id)

    return {
      data: produto,
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const produto = await Produto.findOrFail(params.id)
    await produto.delete()

    return {
      message: 'produto Deletado com sucesso!',
      data: produto,
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const validationSchema = schema.create({
      id_categoria: schema.number([
        rules.required(),
        rules.exists({ table: 'categorias', column: 'id' }),
      ]),
      nome: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(3),
        rules.maxLength(30),
      ]),
      preco: schema.number([rules.required(), rules.unsigned()]),
      descricao: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(3),
        rules.maxLength(60),
      ]),
      ativo: schema.boolean(),

      image: schema.string.optional(),
    })

    const messages = {
      minLength: '{{ field }} deve ter no mínimo {{ options.minLength }} caracteres',
      maxLength: '{{ field }} deve ter no máximo {{ options.maxLength }} caracteres',
      required: '{{ field }} é obrigatório',
      unique: '{{ field }} deve ser único, esse {{ field }} já foi utilizado',
      regex: '{{ field}} deve seguir o padrão: xxx.xxx.xxx-xx onde x = número',
      number: '{{ field }} deve conter um número',
      exists: '{{ field }} deve existir na tabela {{ options.table }}',
      boolean: '{{ field }} deve ser true ou false, 1 ou 0',
    }

    const body = await request.validate({ schema: validationSchema, messages })

    const produto = await Produto.findOrFail(params.id)

    produto.id_categoria = body.id_categoria
    produto.nome = body.nome
    produto.preco = body.preco
    produto.descricao = body.descricao
    produto.ativo = body.ativo

    const imagem = request.file('imagem', this.validationOptions)
    if (imagem) {
      const tmpPath = imagem.tmpPath || ''
      try {
        const result = await cloudinary.v2.uploader.upload(tmpPath)
        body.image = result?.url
      } catch {
        throw new Exception('Duro golpe, o upload de imagem falhou!')
        body.image =
          'https://res.cloudinary.com/rajfood/image/upload/v1653433375/TKQZGZF_nmrmha.jpg'
      }
    }

    await produto.save()

    return {
      message: 'produto Atualizado com Sucesso!',
      data: produto,
    }
  }
}
