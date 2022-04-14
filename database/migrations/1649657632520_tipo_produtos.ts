import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TipoProdutos extends BaseSchema {
  protected tableName = 'tipo_produtos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
                            .unsigned()

      table.string('nome', 50).notNullable()

      table.string('descricao', 120).notNullable()


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
