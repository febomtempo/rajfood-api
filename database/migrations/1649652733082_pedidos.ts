import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Pedidos extends BaseSchema {
  protected tableName = 'pedidos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
                            .unsigned()

      table.integer('id_cliente').notNullable()
                                 .unsigned()
                                 .references('id')
                                 .inTable('clientes')

      table.integer('id_restaurante').notNullable()
                                     .unsigned()
                                     .references('id')
                                     .inTable('restaurantes')

      table.integer('id_endereco').notNullable()
                                          .unsigned()
                                          .references('id')
                                          .inTable('enderecos')

      table.float('total').notNullable()
                          .unsigned()

      table.integer('forma_pagamento').notNullable()
                                      .unsigned()

      table.integer('troco').unsigned()

      table.integer('status').notNullable().defaultTo(1)


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
