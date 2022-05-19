import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Produto from 'App/Models/Produto'
import cloudinary from 'cloudinary'
import Env from '@ioc:Adonis/Core/Env'


cloudinary.v2.config({ 
  cloud_name: Env.get('CLOUD_NAME'), 
  api_key: Env.get('API_KEY'), 
  api_secret: Env.get('API_SECRET'), 
});

export default class ProdutosController {

  private validationOptions = {
    types: ["image"],
    size: '2mb',
  }

    public async store({ request, response }: HttpContextContract) {
        const body = request.body()
        const image = request.file('image', this.validationOptions )
        if(image){
          const tmpPath = image.tmpPath || ''
          try{
          const result = await cloudinary.v2.uploader.upload(tmpPath)
          body.image = result?.url
          }catch{
          body.image = undefined
          }
        }
        
        
  

        /*if(image){
          await image.moveToDisk('rajfood')
        }*/

        /* if(image){
          const imageName = `${uuidv4()}.${image.extname}`
    
          await image.move(Application.tmpPath('uploads'), {
            name: imageName
          })
    
          body.image = imageName
        } */

        
    
        const produto = await Produto.create(body)
    
        response.status(201)

    
        return {
          message: 'produto registrado com sucesso!',
          data: produto,
        }
    }
      

    public async index(){
        const produto = await Produto.all()
        
        return{
          data:produto,
        }
    }
    
    public async show({params}: HttpContextContract){
        const produto = await Produto.findOrFail(params.id)
    
        
    
        return{
          data:produto,
        }
    }

    public async destroy({params}: HttpContextContract){
        const produto = await Produto.findOrFail(params.id)
        await produto.delete()

        
        return{
          message: 'produto Deletado com sucesso!',
          data:produto,
        }
    }
    
    public async update({params, request}: HttpContextContract){
        const body = request.body()
        const produto = await Produto.findOrFail(params.id)
    
        produto.id_categoria = body.id_categoria
        produto.nome = body.nome
        produto.preco = body.preco
        produto.descricao = body.descricao
        produto.ativo = body.ativo

        const image = request.file('image', this.validationOptions )
          
        if(image){
            const tmpPath = image.tmpPath || ''
            //console.log(image)
            try{
              const result = await cloudinary.v2.uploader.upload(tmpPath) 
              produto.image = result?.url
            }catch{
              throw new Exception('Duro golpe, o upload de imagem falhou!')
            }
          }
        
        
    
        await produto.save()
   
    
        return{
          message: 'produto Atualizado com Sucesso!',
          data: produto,
        }
    }
}
