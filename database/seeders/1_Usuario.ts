import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Usuario from 'App/Models/Usuario'

export default class UsuarioSeeder extends BaseSeeder {
  public async run () {
    await Usuario.create({
      "nome" : "admin",
      "sobrenome" : "admin",
      "fone" : "(18) 12345-1234",
      "email": "admin@gmail.com",
      "password" : "admin"
    })
    
  }
}
