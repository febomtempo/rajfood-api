import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Pagamentos extends BaseSchema {
  protected tableName = 'pagamentos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
                            .unsigned()

      table.integer('id_restaurante').notNullable()
                                     .unsigned()
                                     .references('id')
                                     .inTable('restaurantes')

      table.integer('id_pedido').notNullable()
                                .unsigned()
                                .references('id')
                                .inTable('pedidos')

      table.float('valor').notNullable()
                          .unsigned()

      table.string('pagante', 50).notNullable()

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
