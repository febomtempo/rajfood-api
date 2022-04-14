import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TipoProduto from 'App/Models/TipoProduto'

export default class TipoProdutosController {

    public async store({ request, response }: HttpContextContract) {
        const body = request.body()
    
    
        const tipoProduto = await TipoProduto.create(body)
    
        response.status(201)

    
        return {
          message: 'tipoProduto registrado com sucesso!',
          data: tipoProduto,
        }
    }
      

    public async index(){
        const tipoProduto = await TipoProduto.all()
        
        return{
          data:tipoProduto,
        }
    }
    
    public async show({params}: HttpContextContract){
        const tipoProduto = await TipoProduto.findOrFail(params.id)
    
        
    
        return{
          data:tipoProduto,
        }
    }

    public async destroy({params}: HttpContextContract){
        const tipoProduto = await TipoProduto.findOrFail(params.id)
        await tipoProduto.delete()

        
        return{
          message: 'tipoProduto Deletado com sucesso!',
          data:tipoProduto,
        }
    }
    
    public async update({params, request}: HttpContextContract){
        const body = request.body()
        const tipoProduto = await TipoProduto.findOrFail(params.id)
    
        tipoProduto.nome = body.nome
        tipoProduto.descricao = body.sobrenome

        await tipoProduto.save()

        
    
        return{
          message: 'tipoProduto Atualizado com Sucesso!',
          data: tipoProduto,
        }
    }
}
