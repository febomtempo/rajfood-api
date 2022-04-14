import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Restaurante from 'App/Models/Restaurante'

export default class RestaurantesController {

    public async store({ request, response }: HttpContextContract) {
        const body = request.body()
    
    
        const restaurante = await Restaurante.create(body)
    
        response.status(201)

    
        return {
          message: 'restaurante registrado com sucesso!',
          data: restaurante,
        }
    }
      

    public async index(){
        const restaurante = await Restaurante.all()
        
        return{
          data:restaurante,
        }
    }
    
    public async show({params}: HttpContextContract){
        const restaurante = await Restaurante.findOrFail(params.id)
    
        
    
        return{
          data:restaurante,
        }
    }

    public async destroy({params}: HttpContextContract){
        const restaurante = await Restaurante.findOrFail(params.id)
        await restaurante.delete()

        
        return{
          message: 'restaurante Deletado com sucesso!',
          data:restaurante,
        }
    }
    
    public async update({params, request}: HttpContextContract){
        const body = request.body()
        const restaurante = await Restaurante.findOrFail(params.id)
    
        restaurante.nome = body.nome
        restaurante.descricao = body.sobrenome
        restaurante.fone = body.fone
        restaurante.endereco = body.endereco
    
        
        await restaurante.save()

        
    
        return{
          message: 'restaurante Atualizado com Sucesso!',
          data: restaurante,
        }
    }
}