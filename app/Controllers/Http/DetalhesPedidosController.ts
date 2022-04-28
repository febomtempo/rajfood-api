import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DetalhesPedido from 'App/Models/DetalhesPedido'

export default class DetalhesPedidosController {

    public async store({ request, response }: HttpContextContract) {
        const body = request.body()
    
    
        const detalhesPedido = await DetalhesPedido.create(body)
    
        response.status(201)

    
        return {
          message: 'detalhesPedido registrado com sucesso!',
          data: detalhesPedido,
        }
    }
      

    public async index(){
        const detalhesPedido = await DetalhesPedido.all()
        
        return{
          data:detalhesPedido,
        }
    }
    
    public async show({params}: HttpContextContract){
        const detalhesPedido = await DetalhesPedido.findOrFail(params.id)
    
        
    
        return{
          data:detalhesPedido,
        }
    }

    public async destroy({params}: HttpContextContract){
        const detalhesPedido = await DetalhesPedido.findOrFail(params.id)
        await detalhesPedido.delete()

        
        return{
          message: 'detalhesPedido Deletado com sucesso!',
          data:detalhesPedido,
        }
    }
}
