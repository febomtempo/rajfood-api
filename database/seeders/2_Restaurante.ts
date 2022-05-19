import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Restaurante from 'App/Models/Restaurante'

export default class RestauranteSeeder extends BaseSeeder {
  public async run () {
    await Restaurante.create({
      "id_usuario" : 1,
      "nome" : "RajFOOD",
      "descricao" : "O melhor chef indiano da história com seu mais novo restaurante: RAJFOOD!",
      "fone" : "(18) 12345-1234",
      "endereco" : "Rua das Receitas, 123 - Nova Deli",
      "status" : "Fechado",
      "valorEnvio" : 2
    })
  }
}
