import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Categoria from 'App/Models/Categoria'

export default class categoriasController {

    public async store({ request, response }: HttpContextContract) {
        const body = request.body()
    
    
        const categoria = await Categoria.create(body)
    
        response.status(201)

    
        return {
          message: 'categoria registrado com sucesso!',
          data: categoria,
        }
    }
      

    public async index(){
        const categoria = await Categoria.all()
        
        return{
          data:categoria,
        }
    }
    
    public async show({params}: HttpContextContract){
        const categoria = await Categoria.findOrFail(params.id)
    
        
    
        return{
          data:categoria,
        }
    }

    public async destroy({params}: HttpContextContract){
        const categoria = await Categoria.findOrFail(params.id)
        await categoria.delete()

        
        return{
          message: 'categoria Deletado com sucesso!',
          data:categoria,
        }
    }
    
    public async update({params, request}: HttpContextContract){
        const body = request.body()
        const categoria = await Categoria.findOrFail(params.id)
    
        categoria.nome = body.nome
        categoria.descricao = body.sobrenome

        await categoria.save()

        
    
        return{
          message: 'categoria Atualizado com Sucesso!',
          data: categoria,
        }
    }
}
