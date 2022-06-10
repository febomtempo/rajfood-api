import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DetalhesPedidos extends BaseSchema {
  protected tableName = 'detalhes_pedidos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable().unsigned()

      table.integer('pedido_id').notNullable().unsigned().references('id').inTable('pedidos')

      table.integer('produto_id').notNullable().unsigned().references('id').inTable('produtos')

      table.integer('quantidade').notNullable().unsigned()

      table.float('valor_total_item').notNullable().unsigned()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
