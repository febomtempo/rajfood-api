import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Restaurantes extends BaseSchema {
  protected tableName = 'restaurantes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
                            .unsigned()

      table.integer('id_usuario').notNullable()
                                 .unsigned()
                                 .references('id')
                                 .inTable('usuarios')

      table.string('nome', 50).notNullable()

      table.string('descricao', 120).notNullable()
      
      table.string('fone', 15).notNullable()
                              .unique()
                              
      table.string('endereco', 120).notNullable()
                                   .unique()

      
            

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
