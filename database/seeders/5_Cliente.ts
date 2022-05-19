import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Cliente from 'App/Models/Cliente'

export default class ClienteSeeder extends BaseSeeder {
  public async run () {
    await Cliente.createMany([
      {
        "nome" : "Cristiano",
        "sobrenome" : "Ronaldo",
        "fone" : "(18) 32323-1234",
        "email": "cr7@gmail.com",
        "password" : "penaldo"
      },

      {
        "nome" : "Lionel",
        "sobrenome" : "Messi",
        "fone" : "(18) 34423-1234",
        "email": "messi@gmail.com",
        "password" : "lapulga"
      },

      {
        "nome" : "Neymar",
        "sobrenome" : "Junior",
        "fone" : "(18) 34423-3333",
        "email": "neymar@gmail.com",
        "password" : "adultoney"
      },

      {
        "nome" : "Deyverson",
        "sobrenome" : "Brum",
        "fone" : "(18) 12345-3333",
        "email": "deyvin@gmail.com",
        "password" : "melhordomundo"
      },
      
    ])
  }
}
