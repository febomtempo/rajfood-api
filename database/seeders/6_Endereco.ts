import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Endereco from 'App/Models/Endereco'

export default class EnderecoSeeder extends BaseSeeder {
  public async run () {
    await Endereco.createMany([
      {
        "id_cliente" : 1,
        "descricao" : "Casa",
        "cep" : "04849-529",
        "rua": "Rua 13 de Maio",
        "bairro" : "Cantinho do Céu",
        "cidade" : "São Paulo",
        "estado" : "SP",
        "numero" : "7",
      },

      {
        "id_cliente" : 2,
        "descricao" : "Casa",
        "cep" : "05123-000",
        "rua": "Rua Abraham Lincoln",
        "bairro" : "Parque São Domingos",
        "cidade" : "São Paulo",
        "estado" : "SP",
        "numero" : "10",
      },

      {
        "id_cliente" : 3,
        "descricao" : "Casa",
        "cep" : "02276-060",
        "rua": "Rua Abílio Ferreira Brandão",
        "bairro" : "Jaçanã",
        "cidade" : "São Paulo",
        "estado" : "SP",
        "numero" : "20",
      },

      {
        "id_cliente" : 4,
        "descricao" : "Trabalho",
        "cep" : "05005-030",
        "rua": "Rua Palestra Itália",
        "bairro" : "Perdizes",
        "cidade" : "São Paulo",
        "estado" : "SP",
        "numero" : "214",
      },   
      
    ])
  }
}
