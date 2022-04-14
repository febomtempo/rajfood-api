import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'

export default class UsuariosController {

    public async store({ request, response }: HttpContextContract) {
        const body = request.body()
    
    
        const usuario = await Usuario.create(body)
    
        response.status(201)

    
        return {
          message: 'usuario registrado com sucesso!',
          data: usuario,
        }
    }
      

    public async index(){
        const usuario = await Usuario.all()
        
        return{
          data:usuario,
        }
    }
    
    public async show({params}: HttpContextContract){
        const usuario = await Usuario.findOrFail(params.id)
    
        
    
        return{
          data:usuario,
        }
    }

    public async destroy({params}: HttpContextContract){
        const usuario = await Usuario.findOrFail(params.id)
        await usuario.delete()

        
        return{
          message: 'usuario Deletado com sucesso!',
          data:usuario,
        }
    }
    
    public async update({params, request}: HttpContextContract){
        const body = request.body()
        const usuario = await Usuario.findOrFail(params.id)
    
        usuario.nome = body.nome
        usuario.sobrenome = body.sobrenome
        usuario.fone = body.fone
        usuario.email = body.email
        usuario.login = body.login
        usuario.senha = body.senha
    
        
        await usuario.save()

        
    
        return{
          message: 'usuario Atualizado com Sucesso!',
          data: usuario,
        }
    }
}
