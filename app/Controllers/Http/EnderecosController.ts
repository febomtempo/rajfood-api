import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Endereco from 'App/Models/Endereco'

export default class EnderecosController {

    public async store({ request, response }: HttpContextContract) {
        const body = request.body()
    
    
        const endereco = await Endereco.create(body)
    
        response.status(201)

    
        return {
          message: 'Endereco registrado com sucesso!',
          data: endereco,
        }
    }
      

    public async index(){
        const endereco = await Endereco.all()
        
        return{
          data:endereco,
        }
    }
    
    public async show({params}: HttpContextContract){
        const endereco = await Endereco.findOrFail(params.id)
    
        
    
        return{
          data:endereco,
        }
    }

    public async destroy({params}: HttpContextContract){
        const endereco = await Endereco.findOrFail(params.id)
        await endereco.delete()

        
        return{
          message: 'Endereco Deletado com sucesso!',
          data:endereco,
        }
    }
    
    public async update({params, request}: HttpContextContract){
        const body = request.body()
        const endereco = await Endereco.findOrFail(params.id)

        endereco.cep = body.cep
        endereco.rua = body.rua
        endereco.bairro = body.bairro
        endereco.cidade = body.cidade
        endereco.estado = body.estado
        endereco.numero = body.numero
        endereco.complemento = body.complemento
    
        
        await endereco.save()

        
    
        return{
          message: 'Endereco Atualizado com Sucesso!',
          data: endereco,
        }
    }
}
