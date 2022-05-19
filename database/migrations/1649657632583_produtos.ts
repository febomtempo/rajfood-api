import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Produtos extends BaseSchema {
  protected tableName = 'produtos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
                            .unsigned()

      table.integer('id_categoria').notNullable()
                                      .unsigned()
                                      .references('id')
                                      .inTable('categorias')

      table.string('nome', 50).notNullable()
      
      table.float('preco').notNullable()
                           .unsigned()

      table.string('descricao', 120).notNullable()


      table.boolean('ativo').notNullable().defaultTo(true)

      table.string('image', 120)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
