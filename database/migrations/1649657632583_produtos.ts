import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Produtos extends BaseSchema {
  protected tableName = 'produtos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
                            .unsigned()

      table.integer('id_tipo_produto').notNullable()
                                      .unsigned()
                                      .references('id')
                                      .inTable('tipo_produtos')

      table.string('nome', 50).notNullable()

      
      table.float('precoP').unsigned()
      
      table.float('precoM').notNullable()
                           .unsigned()
      
      table.float('precoG').unsigned()
      
      table.string('descricao', 120).notNullable()

      table.integer('tamanho').notNullable().defaultTo(0)

      table.boolean('status').notNullable().defaultTo(true)

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
