import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Produto from 'App/Models/Produto'
import Application from '@ioc:Adonis/Core/Application'
import { v4 as uuidv4 } from 'uuid'
import Drive from '@ioc:Adonis/Core/Drive'

export default class ProdutosController {

  private validationOptions = {
    types: ["image"],
    size: '2mb',
  }

    public async store({ request, response }: HttpContextContract) {
        const body = request.body()
        const image = request.file('image', this.validationOptions )

        if(image){
          const imageName = `${uuidv4()}.${image.extname}`
    
          await image.moveToDisk('./', {
            name: imageName
          })
    
          body.image = imageName
        }
    
        const produto = await Produto.create(body)
    
        response.status(201)

    
        return {
          message: 'produto registrado com sucesso!',
          data: produto,
        }
    }
      

    public async index(){
        const produto = await Produto.all()
        
        return{
          data:produto,
        }
    }
    
    public async show({params}: HttpContextContract){
        const produto = await Produto.findOrFail(params.id)
    
        
    
        return{
          data:produto,
        }
    }

    public async destroy({params}: HttpContextContract){
        const produto = await Produto.findOrFail(params.id)
        await produto.delete()

        
        return{
          message: 'produto Deletado com sucesso!',
          data:produto,
        }
    }
    
    public async update({params, request}: HttpContextContract){
        const body = request.body()
        const produto = await Produto.findOrFail(params.id)
    
        produto.id_tipo_produto = body.id_tipo_produto
        produto.nome = body.nome
        produto.precoP = body.precoP
        produto.precoM = body.precoM
        produto.precoG = body.precoG
        produto.descricao = body.descricao
        produto.ativo = body.ativo

        if(produto.image != body.image || !produto.image){
          const image = request.file('image', this.validationOptions )
          
          if(image){
            const imageName = `${uuidv4()}.${image.extname}`
    
            await image.move(Application.tmpPath('uploads'), {
              name: imageName
            })
    
            produto.image = imageName
          }
        }
        
    
        await produto.save()
   
    
        return{
          message: 'produto Atualizado com Sucesso!',
          data: produto,
        }
    }
}
