import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pedido from 'App/Models/Pedido'

export default class PedidosController {

    public async store({ request, response }: HttpContextContract) {
        const body = request.body()
    
    
        const pedido = await Pedido.create(body)
    
        response.status(201)

    
        return {
          message: 'pedido registrado com sucesso!',
          data: pedido,
        }
    }
      

    public async index(){
        const pedido = await Pedido.all()
        
        return{
          data:pedido,
        }
    }
    
    public async show({params}: HttpContextContract){
        const pedido = await Pedido.findOrFail(params.id)
    
        
    
        return{
          data:pedido,
        }
    }

    public async destroy({params}: HttpContextContract){
        const pedido = await Pedido.findOrFail(params.id)
        await pedido.delete()

        
        return{
          message: 'pedido Deletado com sucesso!',
          data:pedido,
        }
    }
}
