import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Clientes extends BaseSchema {
  protected tableName = 'clientes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
                            .unsigned()
                            
      table.string('nome', 50).notNullable()
      table.string('sobrenome', 50).notNullable()
      table.string('fone', 15).notNullable()
                              .unique()

      table.string('email', 50).notNullable()
                               .unique()

      table.string('login', 16).notNullable()
                               .unique()

      table.string('password', 255).notNullable()

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
