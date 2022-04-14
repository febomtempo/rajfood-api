import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Pagamento from 'App/Models/Pagamento'

export default class PagamentosController {

    public async store({ request, response }: HttpContextContract) {
        const body = request.body()
    
    
        const pagamento = await Pagamento.create(body)
    
        response.status(201)

    
        return {
          message: 'pagamento registrado com sucesso!',
          data: pagamento,
        }
    }
      

    public async index(){
        const pagamento = await Pagamento.all()
        
        return{
          data:pagamento,
        }
    }
    
    public async show({params}: HttpContextContract){
        const pagamento = await Pagamento.findOrFail(params.id)
    
        
    
        return{
          data:pagamento,
        }
    }

    public async destroy({params}: HttpContextContract){
        const pagamento = await Pagamento.findOrFail(params.id)
        await pagamento.delete()

        
        return{
          message: 'pagamento Deletado com sucesso!',
          data:pagamento,
        }
    }
    
}
