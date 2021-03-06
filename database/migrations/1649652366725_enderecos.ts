import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Enderecos extends BaseSchema {
  protected tableName = 'enderecos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable().unsigned()
      table.integer('id_cliente').notNullable().unsigned().references('id').inTable('clientes')
      table.string('descricao', 30).notNullable()
      table.string('cep', 9).notNullable()
      table.string('rua', 60).notNullable()
      table.string('bairro', 60).notNullable()
      table.string('cidade', 60).notNullable()
      table.string('estado', 60).notNullable()
      table.string('numero', 20).notNullable()

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
