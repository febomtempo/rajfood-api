import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Cliente from 'App/Models/Cliente'

export default class ClientesController {

    public async store({ request, response }: HttpContextContract) {
        const body = request.body()
    
    
        const cliente = await Cliente.create(body)
    
        response.status(201)

    
        return {
          message: 'Cliente registrado com sucesso!',
          data: cliente,
        }
    }
      

    public async index(){
        const cliente = await Cliente.all()
        
        return{
          data:cliente,
        }
    }
    
    public async show({params}: HttpContextContract){
        const cliente = await Cliente.findOrFail(params.id)
    
        
    
        return{
          data:cliente,
        }
    }

    public async destroy({params}: HttpContextContract){
        const cliente = await Cliente.findOrFail(params.id)
        await cliente.delete()

        
        return{
          message: 'Cliente Deletado com sucesso!',
          data:cliente,
        }
    }
    
    public async update({params, request}: HttpContextContract){
        const body = request.body()
        const cliente = await Cliente.findOrFail(params.id)
    
        cliente.nome = body.nome
        cliente.sobrenome = body.sobrenome
        cliente.fone = body.fone
        cliente.email = body.email
        cliente.login = body.login
        cliente.password = body.password
    
        
        await cliente.save()

        
    
        return{
          message: 'Cliente Atualizado com Sucesso!',
          data: cliente,
        }
    }
}
