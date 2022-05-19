import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Categoria from 'App/Models/Categoria'

export default class CategoriaSeeder extends BaseSeeder {
  public async run () {
    await Categoria.createMany([
      {
        "nome" : "Lanches",
        "descricao" : "Os Melhores Lanches da cidade são feitos com nosso Hambúrguer caseiro!",
      },

      {
        "nome" : "Pizzas",
        "descricao" : "As Melhores Pizzas com nossa massa de fermentação natural!",
      },

      {
        "nome" : "Porções",
        "descricao" : "As Melhores Porções para você compartilhar com os amigos!",
      },

      {
        "nome" : "Bebidas",
        "descricao" : "Diversas bebidas para você não ficar de boca seca!",
      }
    ])
  }
}
