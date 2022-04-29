import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EnderecoClientes extends BaseSchema {
  protected tableName = 'endereco_clientes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
                            .unsigned()

      table.integer('id_endereco').notNullable()
                                  .unsigned()
                                  .references('id')
                                  .inTable('enderecos')

      table.integer('id_cliente').notNullable()
                                 .unsigned()
                                 .references('id')
                                 .inTable('clientes')

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
