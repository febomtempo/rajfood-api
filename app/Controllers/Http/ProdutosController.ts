import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Produto from 'App/Models/Produto'

export default class ProdutosController {

    public async store({ request, response }: HttpContextContract) {
        const body = request.body()
    
    
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
        produto.preco = body.preco
        produto.descricao = body.descricao
        produto.tamanho = body.tamanho
        produto.status = body.status
    
        
        await produto.save()

        
    
        return{
          message: 'produto Atualizado com Sucesso!',
          data: produto,
        }
    }
}
