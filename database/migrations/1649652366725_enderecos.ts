import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Enderecos extends BaseSchema {
  protected tableName = 'enderecos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
                            .unsigned()
                            
      table.string('rua', 60).notNullable()
      table.string('bairro', 60).notNullable()
      table.string('cidade', 60).notNullable()
      table.string('estado', 60).notNullable()
      table.string('numero', 20).notNullable()
      table.string('complemento', 60)

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
