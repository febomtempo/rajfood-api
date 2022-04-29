import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EnderecoCliente from 'App/Models/EnderecoCliente'

export default class EnderecoClientesController {

    public async store({ request, response }: HttpContextContract) {
        const body = request.body()
    
    
        const enderecoCliente = await EnderecoCliente.create(body)
    
        response.status(201)

    
        return {
          message: 'enderecoCliente registrado com sucesso!',
          data: enderecoCliente,
        }
    }
      

    public async index(){
        const enderecoCliente = await EnderecoCliente.all()
        
        return{
          data:enderecoCliente,
        }
    }
    
    public async show({params}: HttpContextContract){
        const enderecoCliente = await EnderecoCliente.findOrFail(params.id)
    
        
    
        return{
          data:enderecoCliente,
        }
    }

    public async destroy({params}: HttpContextContract){
        const enderecoCliente = await EnderecoCliente.findOrFail(params.id)
        await enderecoCliente.delete()

        
        return{
          message: 'enderecoCliente Deletado com sucesso!',
          data:enderecoCliente,
        }
    }
}
