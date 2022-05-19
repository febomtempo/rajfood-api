import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Produto from 'App/Models/Produto'

export default class ProdutoSeeder extends BaseSeeder {
  public async run () {
    await Produto.createMany([
      {
        "id_categoria" : 1,
        "nome" : "X-Salada",
        "preco" : 16,
        "descricao" : "Pão, hambúrguer, presunto, queijo, tomate e alface.",
      },

      {
        "id_categoria" : 1,
        "nome" : "X-Bacon",
        "preco" : 18,
        "descricao" : "Pão, hambúrguer, bacon fatiado, queijo, tomate e alface.",
      },

      {
        "id_categoria" : 1,
        "nome" : "X-Tudo",
        "preco" : 25,
        "descricao" : "Pão, hambúrguer, calabresa, bacon, ovo, presunto, queijo, tomate e alface.",
      },

      {
        "id_categoria" : 2,
        "nome" : "SETE QUEIJOS",
        "preco" : 42,
        "descricao" : "Molho de tomate, mussarela, provolone, prato, parmesão, ricota, gorgonzola e catupiry.",
      },

      {
        "id_categoria" : 2,
        "nome" : "Catubresa",
        "preco" : 40,
        "descricao" : "Molho de tomate, mussarela, calabresa e catupiry.",
      },

      {
        "id_categoria" : 2,
        "nome" : "Moda da Casa",
        "preco" : 42,
        "descricao" : "Molho de tomate, presunto, calabresa moída, milho, ervilha, mussarela e azeitona.",
      },

      {
        "id_categoria" : 3,
        "nome" : "Batata Frita",
        "preco" : 12,
        "descricao" : "Porção de batata frita.",
      },

      {
        "id_categoria" : 3,
        "nome" : "Frango Frito à Milanesa",
        "preco" : 35,
        "descricao" : "Porção de frango frito à milanesa.",
      },

      {
        "id_categoria" : 3,
        "nome" : "Calabresa com cebola",
        "preco" : 42,
        "descricao" : "Porção de calabresa com cebola.",
      },

      {
        "id_categoria" : 4,
        "nome" : "Coca-Cola 2 Litros",
        "preco" : 10,
        "descricao" : "Coca-Cola de 2 litros",
      },

      {
        "id_categoria" : 4,
        "nome" : "Suco de Laranja (300 ml)",
        "preco" : 6,
        "descricao" : "Copo de suco de laranja",
      },

      {
        "id_categoria" : 4,
        "nome" : "Coca-Cola Lata (350 ml)",
        "preco" : 4,
        "descricao" : "Coca-Cola Lata (350 ml)",
      },
      
    ])
  }
}
