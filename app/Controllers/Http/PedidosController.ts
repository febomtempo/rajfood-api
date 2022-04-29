import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pedido from 'App/Models/Pedido'

export default class PedidosController {

    public async store({ request, response }: HttpContextContract) {
        const body = request.body()
    
    
        const pedido = await Pedido.create(body)
    
        response.status(201)

    
        return {
          message: 'Pedido registrado com sucesso!',
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
          message: 'Pedido Deletado com sucesso!',
          data:pedido,
        }
    }

    public async update({params, request}: HttpContextContract){
      const body = request.body()
      const pedido = await Pedido.findOrFail(params.id)
  
      pedido.id_cliente = body.id_cliente
      pedido.id_restaurante = body.id_restaurante
      pedido.id_endereco_cliente = body.id_endereco_cliente
      pedido.total = body.total
      pedido.forma_pagamento = body.forma_pagamento
      pedido.troco = body.troco
      pedido.status = body.status
  
      
      await pedido.save()

      
  
      return{
        message: 'Pedido Atualizado com Sucesso!',
        data: pedido,
      }
  }
}
